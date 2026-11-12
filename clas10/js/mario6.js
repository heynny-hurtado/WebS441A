const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables de nuestro "Mario"
let mario = { x: 50, y: 300, width: 30, height: 30, vy: 0, jumping: false };
let gravity = 0.5;
let keys = {};

// Plataformas (tres en formato escalonado)
let plataformas = [
    { x: 260, y: 300, width: 90, height: 8 },
    { x: 380, y: 240, width: 90, height: 8 },
    { x: 500, y: 180, width: 90, height: 8 }
];

// Puntaje total acumulado por Mario
let puntaje = 0;

// Monedas (5 en total en la secuencia dada)
let monedas = [
    { x: 120, y: 350, radius: 12, valor: 10, visible: true },
    { x: 230, y: 350, radius: 12, valor: 20, visible: true },
    { x: 305, y: 270, radius: 12, valor: 30, visible: true },
    { x: 425, y: 210, radius: 12, valor: 40, visible: true },
    { x: 545, y: 150, radius: 12, valor: 50, visible: true }
];

let monedasRestantes = monedas.length;
let juegoTerminado = false;

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

function update() {
    if (juegoTerminado) return; // Si ya se ganó, se detiene la lógica

    // Movimiento lateral
    if (keys["ArrowRight"]) mario.x += 4;
    if (keys["ArrowLeft"]) mario.x -= 4;

    // Salto
    if (keys["Space"] && !mario.jumping) {
        mario.vy = -10;
        mario.jumping = true;
    }

    let bordeInferiorAnterior = mario.y + mario.height;

    // Aplicar gravedad
    mario.vy += gravity;
    mario.y += mario.vy;

    let sobreSuperficie = false;

    // Detección de colisión con múltiples plataformas
    let bordeInferiorActual = mario.y + mario.height;

    for (let plat of plataformas) {
        let coincideHorizontalmente =
            mario.x + mario.width > plat.x &&
            mario.x < plat.x + plat.width;

        if (
            mario.vy >= 0 &&
            coincideHorizontalmente &&
            bordeInferiorAnterior <= plat.y &&
            bordeInferiorActual >= plat.y
        ) {
            mario.y = plat.y - mario.height;
            mario.vy = 0;
            mario.jumping = false;
            sobreSuperficie = true;
            break;
        }
    }

    // Colisión con el suelo (Y = 350)
    if (mario.y > 350) {
        mario.y = 350;
        mario.vy = 0;
        mario.jumping = false;
        sobreSuperficie = true;
    }

    if (!sobreSuperficie) {
        mario.jumping = true;
    }

    // Colisión de Mario con las monedas
    for (let moneda of monedas) {
        if (moneda.visible) {
            let puntoCercanoX = Math.max(mario.x, Math.min(moneda.x, mario.x + mario.width));
            let puntoCercanoY = Math.max(mario.y, Math.min(moneda.y, mario.y + mario.height));
            let distanciaX = moneda.x - puntoCercanoX;
            let distanciaY = moneda.y - puntoCercanoY;

            if (distanciaX * distanciaX + distanciaY * distanciaY <= moneda.radius * moneda.radius) {
                moneda.visible = false;
                puntaje += moneda.valor;
                monedasRestantes--;

                // Si se recolectan todas las monedas, finaliza el juego
                if (monedasRestantes === 0) {
                    juegoTerminado = true;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar plataformas
    ctx.fillStyle = "#61167a";
    for (let plat of plataformas) {
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    }

    // Dibujar Suelo
    ctx.fillStyle = "#926886";
    ctx.fillRect(0, 380, canvas.width, 20);

    // Dibujar a Mario
    ctx.fillStyle = "fuchsia";
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);

    // Dibujar monedas (limpias, sin número impreso adentro)
    for (let moneda of monedas) {
        if (moneda.visible) {
            ctx.beginPath();
            ctx.arc(moneda.x, moneda.y, moneda.radius, 0, Math.PI * 2);
            ctx.fillStyle = "gold";
            ctx.fill();
            ctx.strokeStyle = "#c98b00";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Mostrar puntaje y monedas restantes
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Puntaje: " + puntaje, 15, 30);
    ctx.fillText("Monedas: " + monedasRestantes, 15, 55);

    // Pantalla de Victoria cuando se consiguen todas las monedas
    if (juegoTerminado) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";

        ctx.font = "bold 40px Arial";
        ctx.fillText("¡Victoria!", canvas.width / 2, canvas.height / 2 - 20);

        ctx.font = "bold 25px Arial";
        ctx.fillText("Puntaje final: " + puntaje, canvas.width / 2, canvas.height / 2 + 20);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();