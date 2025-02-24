class Plant {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.health = 100;
  }

  display() {
    fill(0, 255, 0);
    rect(this.x, this.y, 50, 50);
  }

  update() {
    // Base update method, overridden by subclasses
  }
}
