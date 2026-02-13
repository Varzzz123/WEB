const mysql = require('mysql2/promise');
const crypto = require('crypto');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { ucp, password } = req.body;

    try {
        const dbSAMP = await mysql.createConnection(process.env.DB_SAMP_URL);

        const [users] = await dbSAMP.execute('SELECT password, salt FROM playerucp WHERE ucp = ?', [ucp]);

        if (users.length === 0) {
            await dbSAMP.end();
            return res.status(401).json({ success: false, message: 'UCP tidak terdaftar!' });
        }

        const dbPassword = users[0].password;
        const dbSalt = users[0].salt;

        const hashInput = crypto.createHash('sha256').update(password + dbSalt).digest('hex').toUpperCase();

        if (hashInput === dbPassword) {

            if (process.env.DB_WEB_URL) {
                const dbWeb = await mysql.createConnection(process.env.DB_WEB_URL);
                await dbWeb.execute(
                    'INSERT INTO web_sessions (ucp, last_login) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE last_login = NOW()',
                    [ucp]
                );
                await dbWeb.end();
            }

            await dbSAMP.end();
            return res.status(200).json({ success: true, ucp: ucp });
        } else {
            await dbSAMP.end();
            return res.status(401).json({ success: false, message: 'Password salah! Hash tidak cocok.' });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
}