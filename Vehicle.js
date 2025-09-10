class Vehicle extends GameObject {

    constructor(x, y, width, height, angle, color, acc, maxSteerAngle) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = acc;
        this.maxReverseSpeed = 100;
        this.braking = 800;
        this.steeringAngle = 0;
        this.maxSteeringAngle = maxSteerAngle;
        this.angle = angle;
        this.wheelbase = this.width;
        this.steeringChange = 5;
        this.rect = new Rectangle(0, 0, this.width, this.height, color);
        this.playerEntered = false;
        this.img = new Image();
        this.img.src = 'img/car-person.png';
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

    update(deltaTime, keyboard) {
        if (keyboard !== null && keyboard !== undefined) {
            if (keyboard.isKeyDown(Buttons.LEFT)) {
                this.turnLeft(deltaTime);
            } else if (keyboard.isKeyDown(Buttons.RIGHT)) {
                this.turnRight(deltaTime);
            }
            else {
                this.goStraight(deltaTime)
            }
            if (keyboard.isKeyDown(Buttons.UP)) {
                this.accelerate(deltaTime)
            }
            if (keyboard.isKeyDown(Buttons.DOWN)) {
                this.decelerate(deltaTime)
            }

        }
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
        if (this.playerEntered) {
            ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
        } else {
            this.rect.draw(ctx);
        }
        ctx.restore();
    }
}