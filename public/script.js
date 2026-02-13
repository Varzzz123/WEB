window.onload = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
};

async function gasLogin() {
    console.log("Fungsi jalan...");
    
    const ucp = document.getElementById('ucp').value;
    const password = document.getElementById('pass').value;
    const msg = document.getElementById('msg');

    if (!ucp || !password) {
        alert("Woi, isi dulu!"); // Buat ngetes respon tombol
        msg.innerText = "Isi dulu UCP dan Password!";
        msg.style.color = "red";
        return;
    }

    msg.innerText = "Menghubungkan...";
    msg.style.color = "orange";

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ucp, password })
        });

        const data = await res.json();
        if (data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userUCP', ucp);
            window.location.href = 'dashboard.html';
        } else {
            msg.innerText = data.message;
            msg.style.color = "red";
        }
    } catch (err) {
        msg.innerText = "Gagal konek ke server!";
        console.error(err);
    }
}