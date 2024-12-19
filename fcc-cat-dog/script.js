// Switch title based on visibility
document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "Come Back, Meow Meow 🐱" : "You are here, Woof Woof 🐶";
});

// Form submission logic
const form = document.getElementById("upload-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const imageInput = document.getElementById("image-input").files[0];
    if (!imageInput) {
        alert("Please upload an image first.");
        return;
    }

    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `
        <div class="result">
            <p>Classifying image...</p>
        </div>
    `;

    setTimeout(() => {
        const isDog = Math.random() > 0.5; // Random for demo
        resultContainer.innerHTML = `
            <div class="result">
                <h2>${isDog ? "It's a 🐶!" : "It's a 🐱!"}</h2>
            </div>
        `;
    }, 2000);
});

// 3D animated background
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    radius: Math.random() * 5 + 1,
}));

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
