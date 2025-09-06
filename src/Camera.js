class Camera {

    constructor(keyboard, x, y, player) {
        this.keyboard = keyboard;
        this.x = x;
        this.y = y;
        this.xSetting = x;
        this.ySetting = y;
        this.speed = 300;
        this.zoomSetting = 1;
        this.zoom = 1;
        this.player = player;
    }

    update(deltaTime) {
        if (this.keyboard.isKeyDown(Buttons.A)) {
            this.xSetting -= this.speed * deltaTime;
        }
        if (this.keyboard.isKeyDown(Buttons.D)) {
            this.xSetting += this.speed * deltaTime;
        }
        if (this.keyboard.isKeyDown(Buttons.W)) {
            this.ySetting -= this.speed * deltaTime;
        }
        if (this.keyboard.isKeyDown(Buttons.S)) {
            this.ySetting += this.speed * deltaTime;
        }
        if (this.keyboard.isKeyDown(Buttons.Q)) {
            this.zoomSetting += 0.1 * deltaTime;
        }
        if (this.keyboard.isKeyDown(Buttons.Z)) {
            this.zoomSetting -= 0.1 * deltaTime;
        }
        if (this.zoomSetting < 0.2) this.zoomSetting = 0.2
        if (this.zoomSetting > 1.5) this.zoomSetting = 1.5

        // this.zoom = this.zoomSetting - Math.abs(this.player.speed) / 5000
        this.zoom = this.zoomSetting

        // target camera position (centered on player, adjusted for zoom)
        const vx = Math.cos(this.player.angle) * this.player.speed;
        const vy = Math.sin(this.player.angle) * this.player.speed;
        const targetX = this.player.x + vx / 4 - (window.innerWidth / 2) / this.zoom;
        const targetY = this.player.y + vy / 4- (window.innerHeight / 2) / this.zoom;

        // smooth follow (lerp)
        const smoothing = 0.05;
        this.x += (targetX - this.x) * smoothing;
        this.y += (targetY - this.y) * smoothing;
    }
}