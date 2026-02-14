const p = JSON.parse(localStorage.getItem('selectedChar'));
if (!p) window.location.href = 'index.html';

        // Set Data
document.getElementById('skinImg').src = `https://night7.com/skins/${p.skin}.png`;
document.getElementById('sLevel').innerText = p.level;
document.getElementById('sExp').innerText = `${p.levelup.toLocaleString()} / ${(p.level * 8).toLocaleString()}`;
document.getElementById('sLastLogin').innerText = p.last_login;

        // Bars Logic
document.getElementById('vHealth').innerText = Math.round(p.health) + "%";
document.getElementById('bHealth').style.width = p.health + "%";
        
document.getElementById('vEnergy').innerText = p.energy + "%";
document.getElementById('bEnergy').style.width = p.energy + "%";

document.getElementById('vStress').innerText = p.stress + "%";
document.getElementById('bStress').style.width = p.stress + "%";

function logout() { localStorage.clear(); window.location.href = 'index.html'; }