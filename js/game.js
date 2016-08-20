//Namespace
var Enja = Enja || {
  canvas: document.createElement("canvas"),
  ctx: null,
  sprites: [],
  chunks: [],
  images: [],
  width: 0,
  height: 0,
  infinite: false,
  chunkSize: 0,
  Game:  function(width, height) {
    var self = this;
    Enja.width = width;
    Enja.height = height;
    Enja.infinite = (width != null) ? false : true;
    Enja.canvas.width = window.innerWidth;
    Enja.canvas.height = window.innerHeight;
    Enja.canvas.style.backgroundColor = "black";
    Enja.ctx = Enja.canvas.getContext('2d');

    window.addEventListener('load', function () {
      document.body.style.margin = 0;
      document.body.style.padding = 0;
      document.body.style.overflow = "hidden";
      document.body.appendChild(Enja.canvas);
    });
    window.addEventListener('resize', function() {
      Enja.canvas.width = window.innerWidth;
      Enja.canvas.height = window.innerHeight;
    });
    window.addEventListener('keydown', function(event) {
      switch(event.keyCode) {
        case 38: //up
          Enja.controls.up = true;
          break;
        case 39: //right
          Enja.controls.right = true;
          break;
        case 40: //down
          Enja.controls.down = true;
          break;
        case 37: //left
          Enja.controls.left = true;
          break;
      }
    });
    window.addEventListener('keyup', function() {
      switch(event.keyCode) {
        case 38: //up
          Enja.controls.up = false;
          break;
        case 39: //right
          Enja.controls.right = false;
          break;
        case 40: //down
          Enja.controls.down = false;
          break;
        case 37: //left
          Enja.controls.left = false;
          break;
      }
    });

    this.load = {
      assetTotal: 0,
      assetsLoaded: 0,
      sprites: [],
      sprite: function(title, imgPath) {
        var self = this;
        if(title == null || imgPath == null) {
          console.error("Game.load.sprite(title, imgpath) takes a title and imgPath argument.");
          return;
        }
        this.assetTotal++;
        var image = new Image();
        image.src = imgPath;
        Enja.images[title] = image;
        image.addEventListener('load', function() {
          self.assetsLoaded++;
          if(self.assetsLoaded === self.assetTotal) {
            if(typeof create != 'function' || typeof update != 'function') {
              console.error("You must define a function called 'create' and 'update'");
              return;
            } else {
              create();
              Enja.loop();
            }
          }
        });
      }
    };
  },
  Sprite: function(x, y, title) {
    this.x = x;
    this.y = y;
    this.image = Enja.images[title];
    this.width = this.image.width;
    this.height = this.image.height;
    this.rotation = 0;
    this.focus = false;
    this.speed = 0;
    this.anchorX = 0;
    this.anchorY = 0;
    this.setAnchor = function(alignX, alignY) {
      this.anchorX = alignX;
      this.anchorY = alignY;
    };

    Enja.sprites.push(this);
  },
  Chunk: function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  },
  erase: function () {
    this.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
  },

  draw: function() {
    //Draw background
    //Need to draw background in 9 different spots to make infinite tiles
    var background = this.sprites[0];
    for(var x = -1; x < 1; x++) {
      for(var y = -1; y < 1; y++) {
        //Enja.ctx.translate(window.innerWidth * 0.5 - Enja.camera.x + background.x, window.innerHeight * 0.5 - Enja.camera.y + background.y);
        Enja.ctx.drawImage(background.image, 0 - background.width * background.anchorX * x, 0 - background.height * background.anchorY * y);
      }
    }
    for(var i = 0; i < this.sprites.length; i++) {
      var sprite = this.sprites[i];
      Enja.ctx.save();
      if(sprite.focus) {
        Enja.camera.x = sprite.x;
        Enja.camera.y = sprite.y;
      }
      Enja.ctx.translate(window.innerWidth * 0.5 - Enja.camera.x + sprite.x, window.innerHeight * 0.5 - Enja.camera.y + sprite.y);
      Enja.ctx.rotate(sprite.rotation * Math.PI/180);
      Enja.ctx.drawImage(sprite.image, 0 - sprite.width * sprite.anchorX, 0 - sprite.height * sprite.anchorY);
      Enja.ctx.restore();
    }
  },
  loop: function() {
    Enja.erase();
    Enja.draw();
    Enja.update();
    update();
    //return; //break loop
    requestAnimationFrame(Enja.loop);
  },
  update: function() {
    if(this.infinite) {
      for(var x = -1; x < 1; x++) {
        for(var y = -1; y < 1; y++) {

        }
      }
    }
  },
  camera: {
    x: 0,
    y: 0
  },
  controls: {
    cursors: {
      up: false,
      right: false,
      down: false,
      left: false
    }
  }
};
