const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];
const numPoints = 150;
const maxDist = 100;

for (let i = 0; i < numPoints; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.5
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p1.alpha})`;
        ctx.fill();
        
        for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            
            if (dist < maxDist) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    points.forEach(point => {
        const dist = Math.hypot(x - point.x, y - point.y);
        if (dist < maxDist) {
            point.size = 3;
        } else {
            point.size = Math.random() * 2 + 1;
        }
    });
});

draw();
