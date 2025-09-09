class Keyboard {
    constructor() {
        this.keys = new Set();
        window.addEventListener("keydown", e => this.keys.add(e.key));
        window.addEventListener("keyup", e => this.keys.delete(e.key));
    }

    isKeyDown(key) {
        return this.keys.has(key);
    }
}