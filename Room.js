function Room(lengthXTiles,lengthYTiles,TileSize,Enemies)
{
	"use strict";
	/*
	Stores tiles in a grid, stores enemies in a seperate array
	*/
	var grid=[];
	var Enemies=Enemies;
	var initializeGrid=function(){
		var x=0;
		while (x<lengthXTiles){
			x++;
			var y=0;
			while (y<lengthYTiles){
				y++;
				grid[x][y] = null;		

	}}};
	var addTile=function(Tile,x,y){
		grid[x][y] = Tile;
		//should probably add something to check
		//that the location is valid
	};
	var getGrid=function(){
		return grid;
	};
	var getGridSpot=function(pixelX, pixelY){
		//check what tile is on the grid at the given pixel location
		//!I need to double check this formula works!
		var gridX=Math.floor(pixelX/TileSize);
		var gridY=Math.floor(pixelY/TileSize);
		return grid[gridX][gridY];
	};

	/* */
	//not working yet	
	initializeGrid();
}


//add this to Room at some point
// down here to avoid merge conflicts

var timeFactor = 1;
var players = []
var turrets = []
var bullets = []

var update = function(){
    for (turret in turrets){turret.update(timeFactor);}
    for (bullet in bullets){bullet.update(timeFactor);}
    for (player in players){player.update(timeFactor);}
    //
};

var draw = function(){
    for (turret in turrets){turret.draw();}
    for (bullet in bullets){bullet.draw();}
    for (tile in grid){
        //draw tile
        //which isn't its own object...
    }
};
