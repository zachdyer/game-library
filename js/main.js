var game = new gameLibrary.Game();

var spaceship = new game.Sprite(300, 250, "img/6B.png");

//overwrite the game.update function for a custom update 
game.update = function() {
    
};

//overwrite the game.draw function to draw to the screen
game.draw = function() {
    this.context.fillStyle = "green";
    this.context.strokeStyle = "red";
    this.circle(500, 500, 100);
    
    this.rect(250, 250, 50, 100);
    
    this.line(0, 0, this.canvas.width, this.canvas.height);
    
    this.sprite(spaceship);
};


//Note: use the this keyword to access the game object in game.update and game.draw functions