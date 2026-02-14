const p = JSON.parse(localStorage.getItem('selectedChar'));

if (!p) {
    window.location.href = 'index.html';
} else {
    renderDashboard();
}

function renderDashboard() {
    document.getElementById('navMoney').innerText = `$${parseInt(p.money).toLocaleString()}`;
    document.getElementById('navGold').innerText = p.gold || 0;
    document.getElementById('navUCP').innerText = p.ucp || "Guest";

    const skinID = p.skin || 0;
    const skinImg = document.getElementById('skinImg');
    
    skinImg.src = `https://samp-objects.com/skins/${skinID}.png`;

    skinImg.onerror = function() {
        this.src = `https://www.samp-world.com/images/skins/${skinID}.png`;
        this.onerror = function() {
            this.src = `https://night7.com/skins/${skinID}.png`;
        };
    };

    document.getElementById('sLevel').innerText = p.level || 1;
    
    const xpCurrent = p.levelup || 0;
    const xpMax = (p.level || 1) * 8;
    document.getElementById('sExp').innerText = `${xpCurrent} / ${xpMax}`;

    const healthVal = Math.round(p.health || 0);
    document.getElementById('vHealth').innerText = healthVal + "%";
    document.getElementById('bHealth').style.width = healthVal + "%";

    const energyVal = Math.round(p.energy || 0);
    document.getElementById('vEnergy').innerText = energyVal + "%";
    document.getElementById('bEnergy').style.width = energyVal + "%";

    const stressVal = Math.round(p.stress || 0);
    document.getElementById('vStress').innerText = stressVal + "%";
    document.getElementById('bStress').style.width = stressVal + "%";

    document.getElementById('sLastLogin').innerText = p.last_login || "Unknown";
    
    document.getElementById('pHead').innerText = "None";
    document.getElementById('pTorso').innerText = "Standard";
    document.getElementById('pLegs').innerText = "Regular";
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}