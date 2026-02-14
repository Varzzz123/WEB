const p = JSON.parse(localStorage.getItem('selectedChar'));

if (!p) {
    window.location.href = 'index.html';
} else {
    document.addEventListener('DOMContentLoaded', renderDashboard);
}

function renderDashboard() {
    // INFO NAVBAR
    document.getElementById('navMoney').innerText = `$${parseInt(p.money).toLocaleString()}`;
    document.getElementById('navGold').innerText = p.gold || 0;
    document.getElementById('navUCP').innerText = p.ucp || "Guest";

    // FOTO KARAKTER - Pake Link yang High Quality
    const skinID = p.skin || 0;
    const skinImg = document.getElementById('skinImg');
    
    // Link ini biasanya transparan dan bersih (HQ)
    skinImg.src = `https://www.samp-world.com/images/skins/${skinID}.png`;

    // Kalau error, ganti ke cadangan
    skinImg.onerror = function() {
        this.src = `https://samp-objects.com/skins/${skinID}.png`;
    };

    // STATS UTAMA
    document.getElementById('sLevel').innerText = p.level || 1;
    const xpCurrent = p.levelup || 0;
    const xpMax = (p.level || 1) * 8;
    document.getElementById('sExp').innerText = `${xpCurrent} / ${xpMax}`;

    // PROGRESS BARS DENGAN ANIMASI
    updateBar('bHealth', 'vHealth', p.health);
    updateBar('bEnergy', 'vEnergy', p.energy);
    updateBar('bStress', 'vStress', p.stress);

    document.getElementById('sLastLogin').innerText = p.last_login || "-";
}

// Fungsi biar bar-nya pas muncul ada animasinya
function updateBar(barId, textId, value) {
    const val = Math.round(value || 0);
    const bar = document.getElementById(barId);
    const text = document.getElementById(textId);
    
    if(bar && text) {
        text.innerText = val + "%";
        // Kasih delay dikit biar kelihatan jalan bar-nya
        setTimeout(() => {
            bar.style.width = val + "%";
        }, 200);
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}