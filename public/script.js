async function gasLogin() {
    const ucp = document.getElementById('ucp').value;
    const password = document.getElementById('pass').value;
    const msg = document.getElementById('msg');
    const loader = document.getElementById('loader');

    if (!ucp || !password) {
        msg.innerText = "Isi UCP dan Password!";
        msg.style.color = "#ff4d4d";
        return;
    }

    loader.style.display = "block";
    msg.innerText = "Sedang memproses...";

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ucp, password })
        });
        const data = await res.json();

        if (data.success) {
            localStorage.setItem('userUCP', ucp);
            window.location.href = 'select-char.html';
        } else {
            msg.innerText = data.message;
            msg.style.color = "#ff4d4d";
            loader.style.display = "none";
        }
    } catch (e) {
        msg.innerText = "Gagal konek ke API!";
        loader.style.display = "none";
    }
}