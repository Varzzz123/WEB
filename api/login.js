const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Gak boleh!' });

    const { ucp, password } = req.body;

    try {
        const dbSAMP = await mysql.createConnection(process.env.DB_SAMP_URL);
        const dbWeb = await mysql.createConnection(process.env.DB_WEB_URL);

        const [rows] = await dbSAMP.execute(
            'SELECT * FROM playerucp WHERE ucp = ? AND password = ?', 
            [ucp, password]
        );

        if (rows.length > 0) {
            await dbWeb.execute(
                'INSERT INTO web_sessions (ucp, last_login) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE last_login = NOW()',
                [ucp]
            );

            res.status(200).json({ success: true, ucp: ucp });
        } else {
            res.status(401).json({ success: false, message: 'UCP atau Password Salah!' });
        }

        await dbSAMP.end();
        await dbWeb.end();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}