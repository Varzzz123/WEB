const p = JSON.parse(localStorage.getItem('selectedChar'));

if (!p) {
    window.location.href = 'index.html';
} else {
    document.getElementById('navMoney').innerText = `$${parseInt(p.money).toLocaleString()}`;
    document.getElementById('navUCP').innerText = p.ucp;
    
    document.getElementById('welcomeName').innerText = p.username.replace('_', ' ');
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}