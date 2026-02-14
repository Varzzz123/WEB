const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    const { ucp } = req.query;
    if (!ucp) return res.status(400).json({ success: false, message: "UCP required" });

    try {
        const db = await mysql.createConnection(process.env.DB_SAMP_URL);
        const [rows] = await db.execute(
            `SELECT username, money, bmoney, brek, phone, age, job, job2, 
            faction, family, phonestatus, twittername, ucp, reg_id, level, 
            levelup, email, warn, last_login, admin, helper, hours, minutes, 
            seconds, gold, vip, vip_time, interior, world, reg_date, skin 
            FROM players WHERE ucp = ?`, 
            [ucp.trim()]
        );
        await db.end();

        return res.status(200).json({ success: true, characters: rows });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}