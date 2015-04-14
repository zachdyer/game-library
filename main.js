var game = new Game("screen");

var frame = 0;

var tick = function() {
	frame++;
	if(frame % 100 === 0 ) {
		console.log("Step: " + frame);
		console.log("FPS: " + game.fps);
	}
};

game.loop(tick);