class Player extends GameObject {

    constructor(keyboard) {
        super();
        this.x = 300;
        this.y = 300;
        this.width = 100;
        this.height = 50;
        this.speed = 0;
        this.steeringAngle = 0;
        this.maxSteeringAngle = Math.PI / 8;
        this.angle = Math.PI / 2;
        this.keyboard = keyboard;
        this.vehicle = new Vehicle();
    }

    update(deltaTime) {
        if (this.keyboard.isKeyDown(Buttons.LEFT)) {
            this.vehicle.turnLeft(deltaTime);
        } else if (this.keyboard.isKeyDown(Buttons.RIGHT)) {
            this.vehicle.turnRight(deltaTime);
        } else {
            this.vehicle.goStraight(deltaTime)
        }

        if (this.keyboard.isKeyDown(Buttons.UP)) {
            this.vehicle.accelerate(deltaTime)
        }
        if (this.keyboard.isKeyDown(Buttons.DOWN)) {
            this.vehicle.decelerate(deltaTime)
        }
        this.vehicle.update(deltaTime);
        this.x = this.vehicle.x;
        this.y = this.vehicle.y;
        this.dx = this.vehicle.dx;
        this.dy = this.vehicle.dy;
        this.speed = this.vehicle.speed;
        this.angle = this.vehicle.angle;
    }

    draw(ctx) {
        this.vehicle.draw(ctx)
    }
}