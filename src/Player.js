class Player extends GameObject {

    constructor(keyboard) {
        super();
        this.x = 300;
        this.y = 400;
        this.width = 10;
        this.height = 10;
        this.speed = 0;
        this.steeringAngle = 0;
        this.maxSteeringAngle = 1.2;
        this.angle = Math.PI / 2;
        this.keyboard = keyboard;
        this.vehicle = null;
        this.maxSpeed = 40;
        this.rect = new Rectangle(0, 0, this.width, this.height, Colors.RED);
    }

    update(deltaTime) {
        if (this.vehicle !== null) {
            this.updateInVehicle(deltaTime);
        } else {
            this.updateWithoutVehicle(deltaTime);
        }
    }

    updateInVehicle(deltaTime) {
        this.vehicle.update(deltaTime, this.keyboard);
        this.x = this.vehicle.x;
        this.y = this.vehicle.y;
        this.dx = this.vehicle.dx;
        this.dy = this.vehicle.dy;
        this.speed = this.vehicle.speed;
        this.angle = this.vehicle.angle;
    }

    updateWithoutVehicle(deltaTime) {
        if (this.keyboard.isKeyDown(Buttons.LEFT)) {
            this.steeringAngle = -this.maxSteeringAngle;
        } else if (this.keyboard.isKeyDown(Buttons.RIGHT)) {
            this.steeringAngle = this.maxSteeringAngle;
        } else {
            this.steeringAngle = 0;
        }

        this.angle += Math.tan(this.steeringAngle) * deltaTime;

        if (this.keyboard.isKeyDown(Buttons.UP)) {
            this.speed = this.maxSpeed;
        } else if (this.keyboard.isKeyDown(Buttons.DOWN)) {
            this.speed = -this.maxSpeed / 2;
        } else {
            this.speed = 0;
        }

        if (this.steeringAngle < -this.maxSteeringAngle) this.steeringAngle = -this.maxSteeringAngle;
        if (this.steeringAngle > this.maxSteeringAngle) this.steeringAngle = this.maxSteeringAngle;

        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;
    }

    draw(ctx) {
        if (this.vehicle !== null) {
            this.vehicle.draw(ctx)
        } else {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            this.rect.draw(ctx);
            ctx.restore();
        }
    }

}