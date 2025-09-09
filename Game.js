class Game {


    constructor() {
        this.keyboard = new Keyboard()
        this.player = new Player(this.keyboard)
        this.world = new World(this.player, 4000, 2000);
        this.camera = new Camera(this.keyboard, 0, 0, this.player)
        window.addEventListener("keydown", e => this.keyDown(e.key));
    }

    update(deltaTime) {
        this.camera.update(deltaTime);
        this.world.update(deltaTime);

        if (this.camera.x < 0) this.camera.x = 0;
        if (this.camera.y < 0) this.camera.y = 0;
        if (this.camera.x > this.world.width - window.innerWidth) this.camera.x = this.world.width - window.innerWidth;
        if (this.camera.y > this.world.height - window.innerHeight) this.camera.y = this.world.height - window.innerHeight;
    }

    keyDown(button) {
        if (button === Buttons.ENTER) {
            this.enterClosestVehicle();
        }
    }

    enterClosestVehicle() {
        if (this.player.vehicle === null) {
            this.player.vehicle = this.world.getClosestVehicle();
        }
        else {
            let stepOut = 50;
            this.player.x = this.player.x + Math.sin(this.player.vehicle.angle) * stepOut;
            this.player.y = this.player.y - Math.cos(this.player.vehicle.angle) * stepOut;
            this.player.vehicle = null;
        }
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