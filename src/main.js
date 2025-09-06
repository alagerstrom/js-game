const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const game = new Game();
let lastTime = performance.now();

function init() {
    console.log("Hello")
    resizeCanvas();
    // Resize whenever window size changes
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(gameLoop);
}

function gameLoop(time) {
    const deltaTime = (time - lastTime) / 1000; // convert ms → seconds
    lastTime = time;

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

init();

