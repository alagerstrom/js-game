class GameObject {
    update(deltaTime) {
        throw new Error("update must be implemented");
    }

    draw(ctx) {
        throw new Error("draw must be implemented");
    }

    isBackground() {
        return false;
    }

    contains() {
        throw new Error("x must be implemented");
    }
}