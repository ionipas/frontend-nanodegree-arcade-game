// Enemies our player must avoid
const positionY = [60, 143, 226];
var Enemy = function(x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = - 100;
    this.y = positionY[random(0, 3)];
    this.speed = random(20, 70);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -100;
      this.y = positionY[random(0, 3)];
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player(x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
function moreEnemies() {
  while (allEnemies.length < 6) {
    const enemy = new Enemy();
    allEnemies.push(enemy);
  }
}
moreEnemies();

const player = new Player(0, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
