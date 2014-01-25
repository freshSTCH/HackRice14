function Room(lengthXTiles,lengthYTiles,TileSize,Turrets)
{
	"use strict";
	/*
	Stores tiles in a grid, stores enemies in a seperate array
	*/

	var Turrets=Turrets;
	var TileSize=TileSize;
	var lengthXTiles=lengthXTiles;
	var lengthYTiles=lengthYTiles;

	var grid=[];
	var StartTile=null;
	var initializeGrid=function(){
		var x=0;
		while (x<lengthXTiles){
			var y=0;
			while (y<lengthYTiles){
				grid[x][y]=null;
				y++;
			x++;		

	}}};
	var addTile=function(Tile,x,y){
		grid[x][y] = Tile;
		//should probably add something to check
		//that the location is valid
	};
	var addTurret=function(Turret,x,y){
		Turrets[x][y]=Turret;
	};
	var getGrid=function(){
		return grid;
	};
	var getTurrets=function(){
		return Turrets;
	};
	var getGridSpot=function(pixelX, pixelY){
		//check what tile is on the grid at the given pixel location
		var gridX=Math.floor(pixelX/TileSize);
		var gridY=Math.floor(pixelY/TileSize);
		return grid[gridX][gridY];
	};
	var setStart=function(x, y){
		addTile("StartTile",x,y);

	};
	var setEnd=function(x, y){
		addTile("EndTile",x,y);

	};
	
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
