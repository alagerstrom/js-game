class Background extends GameObject {

    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    update(deltaTime) {
    }

    draw(ctx) {
        ctx.fillStyle = "gray";
        let squareSize = 100;
        ctx.fillRect(0, 0, this.width, this.height);

        for (let x = 0; x * squareSize < this.width; x++) {
            for (let y = 0; y * squareSize < this.height; y ++) {
                if ((x + y) % 2 === 0) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
                }
            }
        }
    }

    isBackground() {
        return true;
    }
}