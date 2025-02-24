let grid;
let zombies = [];
let sunPoints = 50; // Starting sun points
let currentWave = 0;
let waveTimer = 0;
let waveDelay = 600; // 10 seconds at 60fps

function setup() {
  createCanvas(900, 500); // 9 columns x 5 rows, 100x100 cells
  grid = createGrid(5, 9);
  spawnWave(); // Start the first wave
}

function draw() {
  background(200); // Gray background
  drawGrid();

  // Update and display plants
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j]) {
        grid[i][j].update();
        grid[i][j].display();
      }
    }
  }

  // Update and display zombies
  for (let zombie of zombies) {
    zombie.move();
    zombie.display();
    let col = floor(zombie.x / 100);
    if (col >= 0 && col < 9 && grid[zombie.lane][col]) {
      grid[zombie.lane][col].health -= 1;
      if (grid[zombie.lane][col].health <= 0) {
        grid[zombie.lane][col] = null;
      }
    }
    if (zombie.x < 0) {
      // Game over if a zombie reaches the left side
      noLoop();
      textAlign(CENTER);
      textSize(32);
      text("Game Over", width / 2, height / 2);
    }
  }

  // Remove dead or off-screen zombies
  zombies = zombies.filter((z) => z.health > 0 && z.x > -50);

  // Spawn new wave after delay
  if (zombies.length === 0) {
    waveTimer++;
    if (waveTimer >= waveDelay) {
      spawnWave();
      waveTimer = 0;
    }
  }

  displayUI();
}

function createGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = null; // Empty cell
    }
  }
  return grid;
}

function drawGrid() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {
      fill(0, 255, 0); // Green lawn
      rect(j * 100, i * 100, 100, 100);
    }
  }
}

function spawnWave() {
  currentWave++;
  for (let i = 0; i < currentWave * 2; i++) {
    let lane = floor(random(0, 5));
    zombies.push(new BasicZombie(lane));
  }
}

function mousePressed() {
  let row = floor(mouseY / 100);
  let col = floor(mouseX / 100);
  if (row >= 0 && row < 5 && col >= 0 && col < 9 && !grid[row][col]) {
    if (sunPoints >= 100) {
      // Peashooter cost
      grid[row][col] = new Peashooter(col * 100, row * 100);
      sunPoints -= 100;
    }
  }
}

function displayUI() {
  fill(0);
  textSize(20);
  text(`Sun: ${sunPoints}`, 10, 20);
  text(`Wave: ${currentWave}`, 10, 40);
}
