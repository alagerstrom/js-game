class World {

    constructor(player, width, height) {
        this.width = width;
        this.height = height;
        this.player = player;

        this.vehicles = [
            new Vehicle(300, 500, 100, 50, 0, Colors.YELLOW, 200, Math.PI / 8),
            new Vehicle(500, 500, 100, 50, 0, Colors.GREEN, 200, Math.PI / 8),
            new Vehicle(600, 600, 100, 50, 0, Colors.RED, 400, Math.PI / 8),
            new Vehicle(500, 800, 300, 100, 0, Colors.BLUE, 50, Math.PI / 4),
        ]
        this.gameObjects = []
        this.gameObjects.push(
            new Background(this.width, this.height)
        )
        for (let v of this.vehicles) {
            this.gameObjects.push(v)
        }

        // this.gameObjects.push(new Road(i * 100, j * 100))

        this.gameObjects.push(this.player)
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

    getClosestVehicle() {
        let maxDistance = 100;
        let dist = null;
        let closest = null;
        for (let v of this.vehicles) {
            let thisDist = distance(this.player.x, this.player.y, v.x, v.y);
            if (dist === null || thisDist < dist) {
                dist = thisDist;
                closest = v;
            }
        }
        if (dist > maxDistance) return null;
        else return closest;
    }
}

function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
