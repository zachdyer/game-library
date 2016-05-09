function Game() {
  var self = this;
  this.canvas = document.createElement("canvas");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.canvas.style.backgroundColor = "black";
  this.ctx = this.canvas.getContext('2d');

  window.addEventListener('load', function () {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.overflow = "hidden";
    document.body.appendChild(self.canvas);
  });
  this.add = {
    sprite: function(x, y, title) {
      self.ctx.drawImage(self.load.assets[title], x, y);
    }
  }
}

Game.prototype.load = {
  assetTotal: 0,
  assetsLoaded: 0,
  assets: [],
  sprite: function(title, imgPath) {
    var self = this;
    if(title == null || imgPath == null) {
      console.error("Game.load.sprite(title, imgpath) takes a title and imgPath argument.");
      return;
    }
    this.assetTotal++;
    var image = new Image();
    image.src = imgPath;
    this.assets[title] = image;
    image.addEventListener('load', function() {
      self.assetsLoaded++;
      if(self.assetsLoaded === self.assetTotal) {
        if(typeof create != 'function') {
          console.error("You must define a function called 'create'");
          return;
        } else {
          create();
        }
      }
    });
  }
};

Game.prototype.create = function() {
  console.error("Overwrite Game.create as a function to create things for the game.");
};
/*
Game.prototype.add = {
  sprite: function(x, y, title) {
    console.log(this);
  }
}*/
