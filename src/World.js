class World {

    constructor(player) {
        this.player = player;
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
    }

    update(deltaTime) {
        for (let gameObject of this.gameObjects) {
            gameObject.update(deltaTime);
        }
    }

    draw(ctx) {
        for (let gameObject of this.gameObjects) {
            gameObject.draw(ctx);
        }
    }
}