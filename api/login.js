const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { ucp, password } = req.body;

    const dbSAMP = await mysql.createConnection({
        host: process.env.SAMP_DB_HOST,
        user: process.env.SAMP_DB_USER,
        password: process.env.SAMP_DB_PASSWORD,
        database: process.env.SAMP_DB_NAME
    });

    const dbWeb = await mysql.createConnection({
        host: process.env.WEB_DB_HOST,
        user: process.env.WEB_DB_USER,
        password: process.env.WEB_DB_PASSWORD,
        database: process.env.WEB_DB_NAME
    });

    try {
        const [rows] = await dbSAMP.execute(
            'SELECT * FROM playerucp WHERE ucp = ? AND password = ?', 
            [ucp, password]
        );

        if (rows.length > 0) {
            await dbWeb.execute(
                'INSERT INTO web_logins (ucp, last_login) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE last_login = NOW()',
                [ucp]
            );

            res.status(200).json({ success: true, message: "Login Berhasil!" });
        } else {
            res.status(401).json({ success: false, message: "UCP atau Password salah!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } finally {
        await dbSAMP.end();
        await dbWeb.end();
    }
}