class Player extends GameObject {

    constructor(keyboard, easySteer) {
        super();
        this.x = 300;
        this.y = 400;
        this.width = 50;
        this.height = 50;
        this.speed = 0;
        this.steeringAngle = 0;
        this.maxSteeringAngle = 1.2;
        this.angle = Math.PI / 2;
        this.keyboard = keyboard;
        this.vehicle = null;
        this.maxSpeed = 100;
        this.easySteering = easySteer;
        this.rect = new Rectangle(0, 0, this.width, this.height, Colors.RED);
        this.img = new Image();
        this.img.src = 'img/person.png';
    }

    update(deltaTime) {
        if (this.vehicle !== null) {
            this.updateInVehicle(deltaTime);
        } else {
            this.updateWithoutVehicle(deltaTime);
        }
    }

    updateInVehicle(deltaTime) {
        this.vehicle.easySteering = this.easySteering;
        this.vehicle.update(deltaTime, this.keyboard);
        this.x = this.vehicle.x;
        this.y = this.vehicle.y;
        this.dx = this.vehicle.dx;
        this.dy = this.vehicle.dy;
        this.speed = this.vehicle.speed;
        this.angle = this.vehicle.angle;
    }

    updateWithoutVehicle(deltaTime) {
        if (this.easySteering) {
            this.easySteer(deltaTime)
        } else {
            this.gtaSteering(deltaTime)
        }
    }

    easySteer(deltaTime) {
        let keyboard = this.keyboard
        if (keyboard !== null && keyboard !== undefined) {
            if (keyboard.isKeyDown(Buttons.LEFT) && keyboard.isKeyDown(Buttons.DOWN)) {
                this.angle = Math.PI - Math.PI / 4
            } else if (keyboard.isKeyDown(Buttons.LEFT) && keyboard.isKeyDown(Buttons.UP)) {
                this.angle = Math.PI + Math.PI / 4
            } else if (keyboard.isKeyDown(Buttons.RIGHT) && keyboard.isKeyDown(Buttons.DOWN)) {
                this.angle = Math.PI / 4
            } else if (keyboard.isKeyDown(Buttons.RIGHT) && keyboard.isKeyDown(Buttons.UP)) {
                this.angle = 3 * Math.PI / 2 + Math.PI / 4
            } else if (keyboard.isKeyDown(Buttons.LEFT)) {
                this.angle = Math.PI
                this.speed = this.maxSpeed;
            } else if (keyboard.isKeyDown(Buttons.RIGHT)) {
                this.angle = 0;
                this.speed = this.maxSpeed;
            } else if (keyboard.isKeyDown(Buttons.UP)) {
                this.angle = 3 * Math.PI / 2
                this.speed = this.maxSpeed;
            } else if (keyboard.isKeyDown(Buttons.DOWN)) {
                this.angle = Math.PI / 2
                this.speed = this.maxSpeed;
            } else {
                this.speed = 0;
            }
        }

        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;
    }

    gtaSteering(deltaTime) {
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

        } else {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            // this.rect.draw(ctx);
            ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
            ctx.restore();
        }
    }

}