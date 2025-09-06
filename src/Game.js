class Game {


    constructor() {
        this.keyboard = new Keyboard()
        this.player = new Player(this.keyboard)
        this.world = new World(this.player);
        this.camera = new Camera(this.keyboard, 0, 0, this.player)
    }

    update(deltaTime) {
        this.camera.update(deltaTime);
        this.world.update(deltaTime);
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save()
        ctx.scale(this.camera.zoom, this.camera.zoom)
        ctx.translate(-this.camera.x - this.camera.xSetting, -this.camera.y - this.camera.ySetting)

        this.world.draw(ctx)

        ctx.restore()
    }
}