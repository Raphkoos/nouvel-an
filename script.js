// Canvas et confettis
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let confettis = [];
for(let i=0;i<150;i++){
    confettis.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*6+4,
        d: Math.random()*100+50,
        color: `hsl(${Math.random()*360}, 100%, 50%)`,
        tilt: Math.random()*10-10
    });
}

function drawConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let c of confettis){
        ctx.beginPath();
        ctx.moveTo(c.x+c.tilt+ c.r/2, c.y);
        ctx.lineTo(c.x+c.tilt, c.y+c.r);
        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.r/2;
        ctx.stroke();
    }
}

function updateConfetti(){
    for(let c of confettis){
        c.y += 2;
        c.tilt += 0.5;
        if(c.y > canvas.height){
            c.y = -10;
            c.x = Math.random()*canvas.width;
        }
    }
}

function animateConfetti() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animateConfetti);
}
animateConfetti(); // confettis permanents

// --- Fonction générer nom et URL ---
function generateMessage() {
    let name = document.getElementById("name").value || "Raphaël";
    document.getElementById("message").textContent = name + " vous souhaite une belle année !";

    let url = new URL(window.location);
    url.searchParams.set("name", name);
    window.history.replaceState(null, '', url);
}

// --- Copier le lien ---
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Lien copié !");
    });
}

// --- Récupérer nom depuis URL ---
window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    let name = params.get("name");
    if(name) {
        document.getElementById("message").textContent = name + " vous souhaite une belle année !";
        document.getElementById("name").value = name;
    }
};
