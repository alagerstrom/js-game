class Game {


    constructor() {
        this.keyboard = new Keyboard()
        this.player = new Player(this.keyboard)
        this.gameObjects = [
            new Background(4000, 2000),
            new Circle(100, 100, 100, Colors.RED),
            new Circle(400, 200, 100, Colors.BLUE),
            new Circle(600, 600, 100, Colors.GREEN),
            new Circle(800, 1000, 100, Colors.YELLOW),
            new PhysicsBody(
                new Circle(200, 200, 50, Colors.GREEN),
                5, 5
            ),
            new PhysicsBody(
                new Circle(10, 10, 10, Colors.RED),
                1, 2
            ),
            this.player
        ]
        this.camera = new Camera(this.keyboard, 0, 0, this.player)
    }

    update(deltaTime) {
        this.camera.update(deltaTime);

        for (let gameObject of this.gameObjects) {
            gameObject.update(deltaTime);
        }
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save()
        ctx.scale(this.camera.zoom, this.camera.zoom)
        ctx.translate(-this.camera.x - this.camera.xSetting, -this.camera.y - this.camera.ySetting)

        for (let gameObject of this.gameObjects) {
            gameObject.draw(ctx);
        }
        ctx.restore()
    }
}