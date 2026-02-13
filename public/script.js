window.onload = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
};

async function gasLogin() {
    const ucp = document.getElementById('ucp').value;
    const password = document.getElementById('pass').value;
    const msg = document.getElementById('msg');

    if (!ucp || !password) {
        msg.innerText = "Isi dulu UCP ama Passwordnya!";
        msg.className = "error";
        return;
    }

    msg.innerText = "Connecting to Server...";
    msg.className = "";

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ucp, password })
        });

        const data = await res.json();

        if (data.success) {
            msg.innerText = "Berhasil! Mengalihkan...";
            msg.className = "success";

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userUCP', ucp);

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            msg.innerText = data.message || "UCP atau Password salah!";
            msg.className = "error";
        }
    } catch (error) {
        msg.innerText = "Error: Gak bisa konek ke API!";
        msg.className = "error";
        console.error(error);
    }
}