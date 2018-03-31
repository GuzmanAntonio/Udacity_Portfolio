// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we"ve provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we"ve provided to easily load images

    this.sprite = "images/char-boy.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed * dt;
    if (this.x < 600) {
        this.x += (100 * dt);
    } else {
        this.x = -80;
        this.y = Math.random() * 184 + 50;
    }

	// Enemy and Player COllision
    if(this.x < player.x + 60 &&
        this.x + 37 > player.x &&
        this.y < player.y + 20 &&
        this.y + 30 > player.y) {
		score = 0;
		document.getElementById("playerScore").innerHTML = score;
		player.reset();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.x = 100;
    this.y = 420;
    this.sprite = "images/enemy-bug.png";
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Place the player object in a variable called player
var player = new Player();

// Player is reset
Player.prototype.reset = function() {
    this.x = 350;
    this.y = 350;
};

// When the player position is updated
Player.prototype.update = function() {
 	
// When the bug touches the water
	if (this.y < 20) {
	score++;
	document.getElementById("playerScore").innerHTML = score;
	this.reset();
}

};

Player.prototype.handleInput = function(direction) {
    if(direction == "left" && this.x > 20) {
        this.x -= 45;
    }
    if(direction == "right" && this.x < 400) {
        this.x += 45;
    }
    if(direction == "up" && this.y > 20) {
        this.y -= 45;
    }
    if(direction == "down" && this.y < 400) {
        this.y += 45;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var badBoy1 = new Enemy(-80, 50);
var badBoy2 = new Enemy(-180, 130);
var badBoy3 = new Enemy(-455, 220);
var badBoy4 = new Enemy(-380, 130);
var badBoy5 = new Enemy(-480, 50);
var badBoy6 = new Enemy(1, 220);
var badBoy7 = new Enemy(-250, 1);

// Place all enemy objects in an array called allEnemies
var allEnemies = [badBoy1, badBoy2, badBoy3, badBoy4, badBoy5, badBoy6, badBoy7];

// Score Starts at zero
var score = 0;
document.getElementById("playerScore").innerHTML = score;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don"t need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
