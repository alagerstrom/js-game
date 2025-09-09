class Circle extends GameObject{
    constructor(x, y, radius, color) {
        super()
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    update(deltaTime) {
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}