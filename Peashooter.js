class Peashooter extends Plant {
  constructor(x, y) {
    super(x, y, "Peashooter");
    this.shootTimer = 0;
  }

  update() {
    this.shootTimer++;
    if (this.shootTimer >= 60) {
      // Every second at 60fps
      for (let zombie of zombies) {
        if (zombie.lane === Math.floor(this.y / 100) && zombie.x > this.x) {
          zombie.health -= 10;
          break; // Damage the first zombie in the lane
        }
      }
      this.shootTimer = 0;
    }
  }

  display() {
    fill(0, 0, 255);
    rect(this.x, this.y, 50, 50);
  }
}
