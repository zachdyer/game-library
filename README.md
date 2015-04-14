# What is it
This is a game library object for helping to create games.
 
# What does it do
It will take the canvas and resize it to the window size even if the window is resized later by the user. It will also add a black background to the canvas and take any default margins off the body. It will create a canvas object from the canvas in 2D context. It can also start a game loop and keep track of FPS right out of the box. All you have to do is:

var game = new Game(canvasID);

//Run game loop and pass in step function
game.loop(step);

# Basic Demo
http://dev.zachdyerdesign.com/dev/game-library/﻿
 
# Project Information
- Author: Zach Dyer
- Website: ZachDyerDesign.com
- Version: 0.1.0
