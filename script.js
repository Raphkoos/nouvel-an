// Canvas et confettis
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Création des confettis
let confettis = [];
for(let i=0;i<150;i++){
    confettis.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*6+4,
        color: `hsl(${Math.random()*360}, 100%, 50%)`
    });
}

// Dessiner les confettis (vertical uniquement)
function drawConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let c of confettis){
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x, c.y + c.r);
        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.r/2;
        ctx.stroke();
    }
}

// Mettre à jour la position
function updateConfetti(){
    for(let c of confettis){
        c.y += 2; // descend verticalement
        if(c.y > canvas.height){
            c.y = -10;
            c.x = Math.random()*canvas.width;
        }
    }
}

// Animation continue
function animateConfetti() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animateConfetti);
}
animateConfetti();
