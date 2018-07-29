// set position on Y-axes for enemies
const positionY = [60, 143, 226];
//counter for enemies
let enemyId = 0;
// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite) {
    enemyId ++;
    // set staggered starting blocks for enemies
    this.x = (- 100) * enemyId;
    this.y = positionY[random(0, 3)];
    this.speed = random(20, 70);
    this.sprite = 'images/enemy-bug.png';
};

//function that return a random number
function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    //
    if (this.x > 505) {
      this.x = -100;
      this.y = positionY[random(0, 3)];
    };
    // detect collision between an enemy and the player
    // and reset the position for the player
    if (player.x - this.x < 60 && this.x - player.x < 60 && player.y - this.y < 50 && this.y - player.y < 50) {
      player.x = 200;
      player.y = 405;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player constructor function
function Player(x, y, sprite) {
  this.x = 200;
  this.y = 405;
  this.sprite = 'images/char-boy.png';
};

// draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place all enemy objects in an array
let allEnemies = [];
function moreEnemies() {
  while (allEnemies.length < 6) {
    const enemy = new Enemy();
    allEnemies.push(enemy);
  }
}
moreEnemies();

// create the player object
const player = new Player();

// reset position when player wins
Player.prototype.update = function() {
  if (this.y < 5) {
    this.x = 200;
    this.y = 405;
  }
};

//receive user input and move the Player
//according to that input
Player.prototype.handleInput = function(key) {
  if (key === 'up' && this.y > 0) {
    this.y -= 40;
  } else if (key === 'down' && this.y < 400) {
    this.y += 40;
  } else if (key === 'left' && this.x  > 0) {
    this.x -= 50;
  } else if (key === 'right' && this.x < 402) {
    this.x += 50;
  }
};

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
