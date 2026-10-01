function startDiwali() {
    const nameInput = document.getElementById("name");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name 🪔");
        nameInput.focus();
        return;
    }

    // Change the page to celebration screen
    document.body.innerHTML = `
        <div class="celebration">
            <div class="diya">🪔</div>

            <h1>✨ Happy Diwali ✨</h1>

            <h2>Dear ${name} ❤️</h2>

            <p>
                May this Diwali fill your life with
                happiness, love, prosperity and light.
            </p>

            <div class="wish">
                🪔 Wishing You a Very Happy Diwali! 🪔
            </div>
        </div>

        <canvas id="fireworks"></canvas>
    `;

    addCelebrationStyle();
    startFireworks();
}


// Celebration screen styling
function addCelebrationStyle() {
    const style = document.createElement("style");

    style.innerHTML = `
        body {
            display: block;
            background:
                radial-gradient(circle at center,
                #40145f 0%,
                #16052d 45%,
                #030008 100%);
        }

        .celebration {
            position: relative;
            z-index: 5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 25px;
            color: white;
        }

        .diya {
            font-size: 75px;
            animation: diyaGlow 1.5s infinite alternate;
        }

        .celebration h1 {
            margin-top: 10px;
            font-size: 48px;
            color: #ffd54f;
            text-shadow:
                0 0 10px #ff9800,
                0 0 25px #ff6f00,
                0 0 50px #ff9800;
        }

        .celebration h2 {
            margin-top: 18px;
            font-size: 30px;
            color: #fff;
        }

        .celebration p {
            max-width: 600px;
            margin-top: 20px;
            font-size: 19px;
            line-height: 1.7;
        }

        .wish {
            margin-top: 30px;
            padding: 15px 25px;
            border-radius: 30px;
            background: rgba(255, 193, 7, 0.15);
            border: 1px solid #ffc107;
            color: #ffd54f;
            font-size: 18px;
            box-shadow: 0 0 20px rgba(255, 193, 7, 0.4);
        }

        #fireworks {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
        }

        @keyframes diyaGlow {
            from {
                transform: scale(1);
                filter: drop-shadow(0 0 5px #ff9800);
            }

            to {
                transform: scale(1.12);
                filter: drop-shadow(0 0 25px #ffc107);
            }
        }

        @media (max-width: 600px) {
            .celebration h1 {
                font-size: 36px;
            }

            .celebration h2 {
                font-size: 24px;
            }

            .celebration p {
                font-size: 16px;
            }
        }
    `;

    document.head.appendChild(style);
}


// Fireworks
function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];
    let particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.55 + 50;

        for (let i = 0; i < 70; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;

            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 100,
                size: Math.random() * 3 + 1
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04;
            p.life -= 1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle =
                `hsl(${Math.random() * 60 + 20}, 100%, 60%)`;
            ctx.fill();

            if (p.life <= 0) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    setInterval(createFirework, 900);

    // First fireworks immediately
    createFirework();
    createFirework();

    animate();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
