class PhysicsBody extends GameObject {
    constructor(obj, dx = 0, dy = 0) {
        super();
        this.obj = obj;
        this.dx = dx;
        this.dy = dy;
    }

    update(dt) {
        this.obj.update(dt);
        this.obj.x += this.dx * dt;
        this.obj.y += this.dy * dt;
    }

    draw(ctx) {
        this.obj.draw(ctx);
    }
}