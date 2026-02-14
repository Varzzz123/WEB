const p = JSON.parse(localStorage.getItem('selectedChar'));
if (!p) window.location.href = 'index.html';

document.getElementById('displayName').innerText = p.username.replace('_', ' ');
document.getElementById('displayUcp').innerText = `UCP: ${p.ucp}`;
document.getElementById('skinImg').src = `https://night7.com/skins/${p.skin}.png`;

document.getElementById('sGender').innerText = (p.gender == 2) ? "Female" : "Male";
document.getElementById('sMoney').innerText = `$${p.money.toLocaleString()}`;
document.getElementById('sBank').innerText = `$${p.bmoney.toLocaleString()}`;
document.getElementById('sRek').innerText = p.brek;
document.getElementById('sPhone').innerText = p.phone;
document.getElementById('sAge').innerText = p.age;

const factions = { 1: "San Andreas Police", 2: "San Andreas Goverment", 3: "San Andreas Medic", 4: "San Andreas News" };
document.getElementById('sFaction').innerText = factions[p.faction] || "None";
document.getElementById('sFamily').innerText = (p.family != -1) ? `Family ID: ${p.family}` : "None";

document.getElementById('sUid').innerText = p.reg_id;
document.getElementById('sLevelExp').innerText = `${p.levelup}/${p.level * 8}`;
document.getElementById('sWarn').innerText = `${p.warn}/20`;
document.getElementById('sGold').innerText = p.gold;
document.getElementById('sVip').innerText = p.vip > 0 ? `Level ${p.vip}` : "None";
document.getElementById('sTime').innerText = `${p.hours}h ${p.minutes}m ${p.seconds}s`;

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}