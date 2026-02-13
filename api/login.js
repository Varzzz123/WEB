const mysql = require('mysql2/promise');
const crypto = require('crypto');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Metode tidak diizinkan' });
    }

    const { ucp, password } = req.body;

    const hashPassword = crypto.createHash('sha256').update(password).digest('hex').toUpperCase();

    try {
        const dbSAMP = await mysql.createConnection(process.env.DB_SAMP_URL);
        
        // Cari UCP dan Password yang sudah di-hash
        const [rows] = await dbSAMP.execute(
            'SELECT * FROM playerucp WHERE ucp = ? AND password = ?', 
            [ucp, hashPassword]
        );
        
        await dbSAMP.end();

        if (rows.length > 0) {
            const dbWeb = await mysql.createConnection(process.env.DB_WEB_URL);
            
            await dbWeb.execute(
                'INSERT INTO web_sessions (ucp, last_login) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE last_login = NOW()',
                [ucp]
            );
            
            await dbWeb.end();

            return res.status(200).json({ 
                success: true, 
                message: 'Login Berhasil!', 
                ucp: ucp 
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: 'UCP atau Password salah!' 
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan pada server: ' + error.message 
        });
    }
}