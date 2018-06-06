'use strict';
// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
     // The variables that are used to determine the x and y axis and speed of the enemy
        this.x = x;
        this.y = y;
        this.speed = speed;
     // The image/sprite for our enemies
        this.sprite = 'images/enemy-bug.png';
    };

 // Update the enemy's position, required method for game
 // Parameter: dt, a time delta between ticks
    update(dt) {
   // Multiplies the speed by the dt parameter on the x axis
      this.x += this.speed * dt;
   // After the enemies are off the canvas, they reappear randomly with different speeds
      if (this.x > 510) {
        this.x = -50;
        this.speed = 200 + (Math.random() * 123);
      };

   // Checks for collisions between the player and the enemies
      if (player.x < this.x + 80 &&
          player.x + 80 > this.x &&
          player.y <  this.y + 50 &&
          player.y + 50 > this.y) {
          player.x = 202;
          player.y = 405;
      };
    };

 // Renders the enemy into the game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// The player class
class Player {
    constructor(x, y) {
     // The variables that are used to determine the x and y axis of the player (speed no needed)
        this.x = x;
        this.y = y;
     // The image for our player
        this.player = 'images/char-boy.png';
    };

 // Update the player's position, required method for game
 // Parameter: dt, a time delta between ticks
    update(dt) {

    };

 // Renders the image of the player into the game
    render() {
      ctx.drawImage(Resources.get(this.player), this.x, this.y);
    };

 // Allows the user to use the arrow keys to move the player
    handleInput(keyPress) {

   // Enables the left arrow key to move left on the x axis by 102
   // Enables user not to go off the game on the left side
      if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
      }

   // Enables the right arrow key to move right on the x axis by 102
   // Enables user not to go off the game on the right side
      if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
      }

   // Enables the up arrow key to move up on the y axis by 83
      if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
      }

   // Enables the down arrow key to move down on the y axis by 83
   // Enables user not to go off the game on the bottom side
      if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
      }

   // When the user reaches the water, the user is reset to the starting position
      if (this.y < 0) {
        setTimeout(() => {
          this.x = 202;
          this.y = 405;
        }, 300);
      }
    };
};

// All enemies are placed in an array
const allEnemies = [];

// Location of the enemies on the y axis
const enemyLocation = [60, 145, 230];

// The starting location and the speed for each enemy before randomly regenerated
enemyLocation.forEach(function(locationY) {
  const enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// The starting location of the player
const player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
