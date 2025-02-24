class Sunflower extends Plant {
    constructor(x, y) {
        super(x, y, "Sunflower");
        this.sunTimer = 0;
    }

    update() {
        this.sunTimer++;
        if (this.sunTimer >= 300) { // Every 5 seconds at 60fps
            sunPoints += 25;
            this.sunTimer = 0;
        }
    }

    display() {
        fill(255, 255, 0);
        ellipse(this.x + 25, this.y + 25, 40, 40);
    }
} 