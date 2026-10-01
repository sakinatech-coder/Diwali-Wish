function startDiwali() {
    const input = document.getElementById("name");
    const name = input.value.trim();

    if (name === "") {
        input.focus();
        input.placeholder = "Please enter your name ✨";
        return;
    }

    // Escape special characters
    const safeName = name
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    document.body.innerHTML = `
        <canvas id="fireworks"></canvas>

        <div class="celebration">

            <div class="celebration-diya">
                🪔
            </div>

            <div class="mini-stars">
                ✦ ✧ ✦ ✧ ✦
            </div>

            <div class="celebration-content">

                <p class="celebrate-small">
                    ✨ THIS DIWALI, CELEBRATE LIGHT ✨
                </p>

                <h1>
                    Happy Diwali
                </h1>

                <h2>
                    ${safeName} ❤️
                </h2>

                <div class="gold-line"></div>

                <p class="message">
                    May your life sparkle like fireworks,
                    shine like a diya and be filled with
                    happiness, love and prosperity.
                </p>

                <div class="big-wish">
                    🪔 शुभ दीपावली 🪔
                </div>

                <p class="footer-wish">
                    Wishing you and your family a
                    very Happy Diwali! ✨
                </p>

            </div>
        </div>
    `;

    addCelebrationCSS();
    startFireworks();
}


function addCelebrationCSS() {

    const style = document.createElement("style");

    style.innerHTML = `

        body {
            margin: 0;
            overflow: hidden;
            background:
                radial-gradient(
                    circle at center,
                    #401050 0%,
                    #170524 45%,
                    #030007 100%
                );
        }

        #fireworks {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .celebration {
            position: relative;
            z-index: 5;

            min-height: 100vh;

            display: flex;
            justify-content: center;
            align-items: center;

            text-align: center;

            padding: 20px;
        }

        .celebration-content {
            width: min(650px, 90%);

            padding: 40px 25px;

            border-radius: 30px;

            background:
                rgba(20, 5, 35, .55);

            border:
                1px solid rgba(255, 205, 70, .25);

            backdrop-filter: blur(8px);

            box-shadow:
                0 0 40px rgba(255, 170, 0, .12);
        }

        .celebration-diya {
            position: absolute;

            top: 5%;

            font-size: 65px;

            filter:
                drop-shadow(0 0 10px #ff9800)
                drop-shadow(0 0 30px #ff9800);

            animation: diyaMove 1.5s infinite alternate;
        }

        @keyframes diyaMove {
            from {
                transform: scale(1);
            }

            to {
                transform: scale(1.12);
            }
        }

        .mini-stars {
            color: #ffd54f;

            font-size: 20px;

            letter-spacing: 10px;

            margin-bottom: 15px;

            animation: starGlow 1s infinite alternate;
        }

        @keyframes starGlow {
            from {
                opacity: .4;
            }

            to {
                opacity: 1;
            }
        }

        .celebrate-small {
            color: #ffd54f;

            font-size: 13px;

            letter-spacing: 3px;

            margin-bottom: 15px;
        }

        .celebration h1 {
            margin: 0;

            font-size: clamp(45px, 9vw, 85px);

            color: #ffd54f;

            text-shadow:
                0 0 10px #ff9800,
                0 0 25px #ff9800,
                0 0 50px rgba(255,152,0,.7);

            animation: titleGlow 2s infinite alternate;
        }

        @keyframes titleGlow {
            from {
                transform: scale(1);
            }

            to {
                transform: scale(1.03);
            }
        }

        .celebration h2 {
            margin: 10px 0 0;

            font-size: clamp(30px, 6vw, 48px);

            color: white;

            text-shadow:
                0 0 10px rgba(255,255,255,.5);
        }

        .gold-line {
            width: 100px;
            height: 3px;

            margin: 20px auto;

            background: #ffc107;

            border-radius: 10px;

            box-shadow:
                0 0 10px #ffc107,
                0 0 25px #ff9800;
        }

        .message {
            max-width: 550px;

            margin: auto;

            color: #f4edf8;

            font-size: 18px;

            line-height: 1.7;
        }

        .big-wish {
            margin-top: 25px;

            color: #ffd54f;

            font-size: 22px;

            font-weight: bold;

            text-shadow:
                0 0 10px #ff9800;
        }

        .footer-wish {
            margin-top: 18px;

            color: #ddd;

            font-size: 14px;
        }

        @media (max-width: 500px) {

            .celebration-content {
                padding: 35px 18px;
            }

            .celebration-diya {
                top: 3%;
                font-size: 50px;
            }

            .message {
                font-size: 16px;
            }

            .big-wish {
                font-size: 19px;
            }
        }
    `;

    document.head.appendChild(style);
}


// =========================
// FIREWORKS ENGINE
// =========================

function startFireworks() {

    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    let width;
    let height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resize();

    window.addEventListener("resize", resize);

    const rockets = [];
    const particles = [];

    const colors = [
        "#ff1744",
        "#ffea00",
        "#00e5ff",
        "#76ff03",
        "#ff4081",
        "#d500f9",
        "#ff9100"
    ];


    // Create rocket
    function createRocket() {

        rockets.push({
            x: Math.random() * width,
            y: height + 20,

            targetY:
                Math.random() * height * 0.45 +
                height * 0.12,

            speed: Math.random() * 5 + 7,

            color:
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ]
        });
    }


    // Create explosion
    function explode(x, y, color) {

        const count = 110;

        for (let i = 0; i < count; i++) {

            const angle =
                Math.random() * Math.PI * 2;

            const speed =
                Math.random() * 7 + 2;

            particles.push({

                x: x,
                y: y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life: 100,

                size:
                    Math.random() * 2.5 + 1,

                color: color
            });
        }
    }


    // Draw everything
    function animate() {

        ctx.fillStyle =
            "rgba(3, 0, 8, 0.20)";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        // Rockets
        for (let i = rockets.length - 1; i >= 0; i--) {

            const r = rockets[i];

            r.y -= r.speed;

            ctx.beginPath();

            ctx.arc(
                r.x,
                r.y,
                3,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = r.color;

            ctx.shadowBlur = 15;

            ctx.shadowColor = r.color;

            ctx.fill();

            ctx.shadowBlur = 0;


            // Rocket reaches target
            if (r.y <= r.targetY) {

                explode(
                    r.x,
                    r.y,
                    r.color
                );

                rockets.splice(i, 1);
            }
        }


        // Particles
        for (
            let i = particles.length - 1;
            i >= 0;
            i--
        ) {

            const p = particles[i];

            p.x += p.vx;

            p.y += p.vy;

            p.vy += 0.055;

            p.vx *= 0.985;

            p.vy *= 0.985;

            p.life -= 1.2;


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = p.color;

            ctx.globalAlpha =
                Math.max(p.life / 100, 0);

            ctx.shadowBlur = 12;

            ctx.shadowColor = p.color;

            ctx.fill();

            ctx.shadowBlur = 0;

            ctx.globalAlpha = 1;


            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }


    // Fireworks continuously
    setInterval(() => {
        createRocket();
    }, 700);


    // Start immediately
    createRocket();
    createRocket();
    createRocket();

    animate();
}
