var gameLibrary = gameLibrary || {
	Game: function (width, height) {
	
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		var self = this;
		
		//Color of canvas
		this.canvas.style.backgroundColor = "black";
		
		
		//Sets the size of the canvas
		var setSize = function() {
			if(width == null) {
				self.canvas.width = window.innerWidth;
				self.canvas.height = window.innerHeight;
			} else {
				self.canvas.width = width;
				self.canvas.height = height;	
			}
			
		};
		
		//FPS
		this.fps = 0;
		var fps = {
			currentTime: 0,
			lastTime: 0,
			timePerTick: 17,
			updateTime: Date.now(), //This sets a time stamp every second to update the Game.fps
			get: function(currentTime, lastTime) {
				var fps = 1000 / (currentTime - lastTime);
				return fps.toFixed();
			},
			update: function() {
				this.currentTime = Date.now();
				if(this.currentTime - this.updateTime >= 1000) {
					self.fps = this.get(this.currentTime, this.lastTime);
					this.updateTime = this.currentTime;
				}
				this.timePerTick = this.currentTime - this.lastTime;
				this.lastTime = this.currentTime;
		
			}
		};
		
		//Other function
		this.speedPerSecond = function(speed) {
			return speed / fps.timePerTick;
		};
		
		//Draw Shapes
		this.circle = function(x, y, radius) {
			this.context.beginPath();
			this.context.arc(x,y,radius,0,2*Math.PI);
			this.context.fill();
			this.context.stroke();
		};
		this.rect = function(x, y, width, height) {
			this.context.beginPath();
			this.context.rect(x, y, width, height);
			this.context.fill();
			this.context.stroke();
		};
		this.line = function (x1, y1, x2, y2) {
			this.context.beginPath();
			this.context.moveTo(x1, y1);
			this.context.lineTo(x2, y2);
			this.context.stroke();
			this.context.closePath();
		};
		
		//Sprites
		this.Sprite =  function (x, y, img) {
			this.x = x;
			this.y = y;
			this.img = document.createElement("img");
			this.img.src = img;
			this.img.addEventListener("load",function() {
				console.log("image loaded");
			});
		};
		
		var clearScreen = function(){
			self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
		};
	
		//This starts the main game loop
		this.loop = function (){
			requestAnimationFrame(function(){
				fps.update();
				self.update();
				clearScreen();
				self.draw();
				self.loop();
			})
	 	};
	 	
	 	//The custom game update
	 	this.update = function() {
	 		
	 	};
	 	
	 	//The custom game draw
	 	this.draw = function() {
	 		
	 		
	 	};
	 	this.sprite = function (sprite) {
	 		this.context.drawImage(sprite.img, sprite.x, sprite.y);
	 		
	 	}
	 	
		
		//When the window fully loads
		window.addEventListener('load',function(){
			
			//Take the shit off the body
			document.body.style.margin = 0;
			document.body.style.padding = 0;
			document.body.style.overflow = "hidden";
			document.body.style.cursor = "none";
			
			//Size of canvas
			setSize();
			
			//Adds the canvas to the body tag
			document.body.appendChild(self.canvas);
		
			self.loop();
			
		});
		
		//When the user resizes the window
		window.addEventListener("resize", function() {
			setSize();	
		});
	
	}
};

