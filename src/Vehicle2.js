class Vehicle2 extends GameObject {

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
        this.targetAngle = angle;
        this.wheelbase = this.width;
        this.steeringChange = 5;
        this.rect = new Rectangle(0, 0, this.width, this.height, color);
    }

    left(deltaTime) {
        this.targetAngle = Math.PI
        this.acc(deltaTime)
    }

    leftDown(deltaTime) {
        this.targetAngle = Math.PI - Math.PI / 4
        this.acc(deltaTime)
    }

    leftUp(deltaTime) {
        this.targetAngle = Math.PI + Math.PI / 4
        this.acc(deltaTime)
    }

    rightDown(deltaTime) {
        this.targetAngle = Math.PI / 4
        this.acc(deltaTime)
    }

    rightUp(deltaTime) {
        this.targetAngle = 3 * Math.PI / 2 + Math.PI / 4
        this.acc(deltaTime)
    }

    right(deltaTime) {
        this.targetAngle = 0
        this.acc(deltaTime)
    }

    goStraight(deltaTime) {
    }

    up(deltaTime) {
        this.targetAngle = 3 * Math.PI / 2
        this.acc(deltaTime)
    }

    acc(deltaTime) {
        if (this.speed < 0) {
            this.speed += this.braking * deltaTime;
        } else {
            this.speed += this.acceleration * deltaTime;
        }
    }

    dec(deltaTime) {
        this.speed -= this.braking * deltaTime;
        if (this.speed < 0) this.speed = 0;
    }

    down(deltaTime) {
        this.targetAngle = Math.PI / 2
        this.acc(deltaTime)
    }

    update(deltaTime, keyboard) {

        if (keyboard !== null && keyboard !== undefined) {
            if (keyboard.isKeyDown(Buttons.LEFT) && keyboard.isKeyDown(Buttons.DOWN)) {
                this.leftDown(deltaTime)
            } else if (keyboard.isKeyDown(Buttons.LEFT) && keyboard.isKeyDown(Buttons.UP)) {
                this.leftUp(deltaTime)
            } else if (keyboard.isKeyDown(Buttons.RIGHT) && keyboard.isKeyDown(Buttons.DOWN)) {
                this.rightDown(deltaTime)
            } else if (keyboard.isKeyDown(Buttons.RIGHT) && keyboard.isKeyDown(Buttons.UP)) {
                this.rightUp(deltaTime)
            } else if (keyboard.isKeyDown(Buttons.LEFT)) {
                this.left(deltaTime)
            } else if (keyboard.isKeyDown(Buttons.RIGHT)) {
                this.right(deltaTime)
            } else if (keyboard.isKeyDown(Buttons.UP)) {
                this.up(deltaTime)
            } else if (keyboard.isKeyDown(Buttons.DOWN)) {
                this.down(deltaTime)
            } else {
                this.dec(deltaTime)
            }

        }

        const friction = 0.5;
        this.speed *= Math.pow(friction, deltaTime);

        console.log("angle: " + this.angle + ", target: " + this.targetAngle)

        if (this.angle >= 2 * Math.PI) {
            this.angle -= 2 * Math.PI;
        }
        if (this.angle < 0) {
            this.angle += 2 * Math.PI;
        }

        let diff = this.angle - this.targetAngle;

        let goTheOtherWay = false
        if (Math.abs(diff) > Math.PI) {
            goTheOtherWay = true
        }

        if (Math.abs(diff) < 0.1) {
            this.angle = this.targetAngle;
        } else {
            let steering = 0.02
            if (!goTheOtherWay) {
                if (diff < 0) {
                    this.angle += steering;
                } else if (diff > 0) {
                    this.angle -= steering;
                }
            } else {
                if (diff > 0) {
                    this.angle += steering;
                } else if (diff < 0) {
                    this.angle -= steering;
                }
            }
        }


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