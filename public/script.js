async function gasLogin() {
    const ucp = document.getElementById('ucp').value;
    const password = document.getElementById('pass').value;
    const msg = document.getElementById('msg');
    const loader = document.getElementById('loader');
    const btnText = document.querySelector('.txt');

    if (!ucp || !password) {
        msg.innerText = "Woi, isi dulu semuanya!";
        msg.style.color = "#e74c3c";
        return;
    }

    loader.style.display = "block";
    btnText.innerText = "Checking...";

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ucp, password })
        });

        const data = await res.json();

        if (data.success) {
            msg.innerText = "Login Berhasil! Mengambil karakter...";
            msg.style.color = "#2ecc71";
            localStorage.setItem('userUCP', ucp);

            const charRes = await fetch(`/api/get-characters?ucp=${ucp}`);
            const charData = await charRes.json();

            if (charData.success && charData.characters.length > 0) {
                setTimeout(() => renderCharacterButtons(charData.characters), 1000);
            } else {
                msg.innerText = "UCP ketemu, tapi gak ada karakternya!";
                loader.style.display = "none";
                btnText.innerText = "Masuk";
            }
        } else {
            msg.innerText = data.message;
            msg.style.color = "#e74c3c";
            loader.style.display = "none";
            btnText.innerText = "Masuk";
        }
    } catch (err) {
        msg.innerText = "Gagal konek ke API!";
        loader.style.display = "none";
    }
}

function renderCharacterButtons(chars) {
    const card = document.querySelector('.login-card');
    card.innerHTML = `
        <img src="logo.png" class="server-logo">
        <h2>PILIH KARAKTER</h2>
        <p class="sub-text">Ketuk karakter untuk masuk ke Dashboard</p>
        <div id="charList" class="char-container"></div>
    `;

    const list = document.getElementById('charList');
    chars.forEach(c => {
        const btn = document.createElement('div');
        btn.className = 'char-btn';
        // Ambil data username dan level dari tabel players
        btn.innerHTML = `
            <div class="char-info">
                <span class="name">${c.username.replace('_', ' ')}</span>
                <span class="stats">LEVEL ${c.level} • SKIN ID ${c.skin}</span>
            </div>
            <div class="char-icon">➜</div>
        `;
        btn.onclick = () => {
            localStorage.setItem('selectedChar', c.username);
            window.location.href = 'dashboard.html';
        };
        list.appendChild(btn);
    });
}