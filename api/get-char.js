const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');
    
    const { ucp } = req.query;

    try {
        const connection = await mysql.createConnection(process.env.DB_URL);
        const [rows] = await connection.execute(
            'SELECT username, level, skin, money FROM players WHERE ucp = ?', 
            [ucp]
        );
        await connection.end();

        return res.status(200).json({ success: true, characters: rows });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}