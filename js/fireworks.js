const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = random(1, 3);
        this.alpha = 1;
        this.velocity = {
            x: random(-3, 3),
            y: random(-3, 3),
        };
        this.decay = random(0.005, 0.015);
        this.gravity = 0.05;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= 0) {
            particles.splice(particles.indexOf(this), 1);
        }
    }
}

function createFirework() {
    const x = random(canvas.width * 0.2, canvas.width * 0.8);
    const y = random(50, canvas.height / 2);
    const colors = ['#FF5733', '#FFBD33', '#75FF33', '#33FFBD', '#3375FF', '#8433FF', '#FF33A8'];

    for (let i = 0; i < 150; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(random(0, colors.length))]));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.draw();
        particle.update();
    });

    requestAnimationFrame(animate);
}

setInterval(createFirework, 800);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
