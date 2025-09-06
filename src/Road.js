class Road extends GameObject {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.rect = new Rectangle(x, y, 100, 100, Colors.GRAY)
    }

    update(deltaTime) {
    }

    draw(ctx) {
        this.rect.draw(ctx);
    }

    isBackground() {
        return true;
    }
}