export default class Game {
	constructor(config) {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		var self = this
		//Color of canvas
		this.canvas.style.backgroundColor = "black";
		//Take the shit off the body
		document.body.style.margin = 0;
		document.body.style.padding = 0;
		document.body.style.overflow = "hidden";
		document.body.style.cursor = "none";
		//Sets the size of the canvas and context with device pixel ratio
		var setSize = function () {
			// Get the device pixel ratio, falling back to 1.
			let dpr = window.devicePixelRatio || 1;
			if (config.width == null) {
				self.canvas.width = Math.floor(window.innerWidth * dpr)
				self.canvas.height = Math.floor(window.innerHeight * dpr)
				self.canvas.style.width = `${window.innerWidth}px`
				self.canvas.style.height = `${window.innerHeight}px`
			} else {
				self.canvas.width = Math.floor(config.width * dpr)
				self.canvas.height = Math.floor(config.height * dpr)
				self.canvas.style.width = `${config.width}px`
				self.canvas.style.height = `${config.height}px`
			}
			let width = Math.floor(self.canvas.width * dpr)
			let height = Math.floor(self.canvas.height * dpr)
			self.context.width = width
			self.context.height = height
			self.context.scale(dpr, dpr)
		}
		//FPS
		this.fps = 0;
		var fps = {
			currentTime: 0,
			lastTime: 0,
			timePerTick: 17,
			updateTime: Date.now(), //This sets a time stamp every second to update the Game.fps
			get: function (currentTime, lastTime) {
				var fps = 1000 / (currentTime - lastTime);
				return fps.toFixed();
			},
			update: function () {
				this.currentTime = Date.now();
				if (this.currentTime - this.updateTime >= 1000) {
					self.fps = this.get(this.currentTime, this.lastTime);
					this.updateTime = this.currentTime;
				}
				this.timePerTick = this.currentTime - this.lastTime;
				this.lastTime = this.currentTime;

			}
		}
		//Other function
		this.speedPerSecond = function (speed) {
			return speed / fps.timePerTick;
		}
		//Draw Shapes
		this.circle = function (x, y, radius) {
			this.context.beginPath();
			this.context.arc(x, y, radius, 0, 2 * Math.PI);
			this.context.fill();
			this.context.stroke();
		};
		this.rect = function (x, y, width, height) {
			this.context.beginPath();
			this.context.rect(x, y, width, height);
			this.context.closePath();
			this.context.fill();
			this.context.stroke();

		};
		this.line = function (x1, y1, x2, y2) {
			this.context.beginPath();
			this.context.moveTo(x1, y1);
			this.context.lineTo(x2, y2);
			this.context.stroke();
			this.context.closePath();
		}
		//Objects
		this.Sprite = function (x, y, img) {
			this.x = x;
			this.y = y;
			this.img = new Image();
			this.img.src = img;

		}
		var clearScreen = function () {
			self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
		}
		console.log(self.context.strokeStyle)
		//This starts the main game loop
		this.loop = function () {
			requestAnimationFrame(function () {
				fps.update();
				self.update();
				clearScreen();
				self.draw();
				// debug screen if turned on
				if (config.debug) {
					self.context.save()
					let debug = {
						line: {
							x: 20,
							y: 30
						},
						font: {
							size: 16,
							color: 'white'
						},
						background: {
							x: 10,
							y: 20,
							color: 'rgba(0,0,0,0.8)',
							width: 0,
							height: 0
						},
						map: {
							grid: function () {
								// Debug tile map if map data is provided
								self.context.save()
								let padding = 5
								self.context.strokeStyle = 'red'
								self.context.fillStyle = 'red'
								self.context.font = "30px Arial"
								self.context.lineWidth = 1
								self.context.textAlign = "start"
								self.context.textBaseline = "top"
								for (var column = 0; column < self.map.cols; column++) {
									for (var row = 0; row < self.map.rows; row++) {
										var x = column * self.map.tsize + 0.5;
										var y = row * self.map.tsize + 0.5;
										self.context.beginPath()
										self.context.rect(x + padding, y + padding, self.map.tsize - padding, self.map.tsize - padding)
										self.context.stroke()
										self.context.closePath()

										self.context.fillText(`${self.map.tiles[column][row]}`, x + 25, y + 20)
									}
								}



								self.context.restore()

							}
						},
						draw: function () {
							// Get debug background width and height
							for (let i = 0; i < this.data.length; i++) {
								if (self.context.measureText(this.data[i]).width > this.background.width)
									this.background.width = self.context.measureText(this.data[i]).width + 50
								this.background.height = this.font.size * this.data.length + 50
							}
							// Draw debug background
							self.context.beginPath()
							self.context.rect(debug.background.x, debug.background.y, this.background.width, this.background.height)
							self.context.closePath
							self.context.fillStyle = debug.background.color
							self.context.fill()
							// log debug into
							self.context.font = `${debug.font.size}px Arial`
							self.context.fillStyle = debug.font.color
							for (let i = 0; i < this.data.length; i++) {
								self.context.fillText(this.data[i], debug.line.x, debug.line.y += debug.font.size + debug.font.size / 3)
							}

						},
						data: [
							`FPS: ${self.fps}`,
							`Width: ${self.context.width} px`,
							`Height: ${self.context.height} px`,
							`Keys Pressed: ${JSON.stringify(self.pressed)}`
						]
					}
					if (self.map) debug.map.grid()
					debug.draw()

				}
				self.loop();
			})
		}
		//The custom game update
		this.update = function () { }
		//The custom game draw
		this.draw = function () { }
		//When the window fully loads
		window.addEventListener('load', function () {
			//Size of canvas
			setSize();
			//Adds the canvas to the body tag
			document.body.appendChild(self.canvas);
			self.loop();
		});
		//When the user resizes the window
		window.addEventListener("resize", function () {
			setSize();
		})
		// Key Stroke State
		this.pressed = {}
		window.addEventListener('keydown', function (event) {
			self.pressed[event.key] = true
		})
		window.addEventListener('keyup', function (event) {
			delete self.pressed[event.key]
		})
		// Map is null until defined in the stuff goes here
		this.map = null
	}
	getTile() { }
}