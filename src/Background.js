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
        ctx.fillRect(-squareSize / 2, -squareSize/2, this.width, this.height);

        for (let x = 0; x * squareSize < this.width; x++) {
            for (let y = 0; y * squareSize < this.height; y ++) {
                if ((x + y) % 2 === 0) {
                    ctx.fillStyle = "white";
                    ctx.fillRect((x * squareSize) - (squareSize / 2), (y * squareSize) - (squareSize / 2), squareSize, squareSize);
                }
            }
        }
    }

    isBackground() {
        return true;
    }
}