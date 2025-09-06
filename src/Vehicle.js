class Vehicle extends GameObject {

    constructor() {
        super();
        this.x = 300;
        this.y = 300;
        this.width = 100;
        this.height = 50;
        this.speed = 0;
        this.acceleration = 200;
        this.maxReverseSpeed = 100;
        this.braking = 800;
        this.steeringAngle = 0;
        this.maxSteeringAngle = Math.PI / 8;
        this.angle = Math.PI / 2;
        this.wheelbase = this.width;
        this.steeringChange = 5;
        this.rect = new Rectangle(0, 0, this.width, this.height, Colors.YELLOW);
    }

    turnLeft(deltaTime) {
        this.steeringAngle -= this.steeringChange * deltaTime;
    }

    turnRight(deltaTime) {
        this.steeringAngle += this.steeringChange * deltaTime;
    }

    goStraight(deltaTime) {
        this.steeringAngle = 0;
    }

    accelerate(deltaTime) {
        if (this.speed < 0) {
            this.speed += this.braking * deltaTime;
        } else {
            this.speed += this.acceleration * deltaTime;
        }
    }

    decelerate(deltaTime) {
        if (this.speed > 0) {
            this.speed -= this.braking * deltaTime;
        } else {
            this.speed -= this.acceleration * deltaTime;
        }
        if (this.speed < -this.maxReverseSpeed) this.speed = -this.maxReverseSpeed;
    }

    update(deltaTime) {
        const friction = 0.8; // keep 90% of speed per second
        this.speed *= Math.pow(friction, deltaTime);

        if (this.steeringAngle !== 0) {
            this.angle += (this.speed / this.wheelbase) * Math.tan(this.steeringAngle) * deltaTime;
        }

        if (this.steeringAngle < -this.maxSteeringAngle) this.steeringAngle = -this.maxSteeringAngle;
        if (this.steeringAngle > this.maxSteeringAngle) this.steeringAngle = this.maxSteeringAngle;

        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        this.rect.draw(ctx);
        ctx.restore();
    }
}