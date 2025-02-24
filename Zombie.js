class Zombie {
    constructor(lane, speed) {
        this.lane = lane;
        this.x = width;
        this.y = lane * 100 + 25;
        this.health = 100;
        this.speed = speed;
    }

    move() {
        this.x -= this.speed;
    }

    display() {
        fill(255, 0, 0);
        rect(this.x, this.y, 50, 50);
    }
} 