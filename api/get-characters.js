const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    const { ucp } = req.query;

    if (!ucp) {
        return res.status(400).json({ success: false, message: "UCP required" });
    }

    try {
        const db = await mysql.createConnection(process.env.DB_URL);
        
        const [rows] = await db.execute(
            'SELECT username, level, skin, money FROM players WHERE ucp = ?', 
            [ucp]
        );
        
        await db.end();

        return res.status(200).json({ 
            success: true, 
            characters: rows 
        });

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Error DB: " + error.message 
        });
    }
}