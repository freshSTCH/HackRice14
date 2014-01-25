function Room(lengthXTiles,lengthYTiles,TileSize)
{
	"use strict";
	/*
	Stores tiles in a grid, stores enemies in a seperate array
	*/

	
	var TileSize=TileSize;
	var lengthXTiles=lengthXTiles;
	var lengthYTiles=lengthYTiles;

	var grid=new Array(lengthXTiles);
	var turrets=[ ]
	var StartTile=null;

	var initializeGrid=function(){
		var x=0;
		while (x<lengthXTiles){
			grid[x]=new Array(lengthYTiles)
			x++;		
	}};
	var addTile=function(tile,x,y){
		grid[x][y]=tile;
		//should probably add something to check
		//that the location is valid
	};
	var addTurret=function(turret){
		turrets.push(turret);
	};
	var getGrid=function(){
		return grid;
	};
	var getTurrets=function(){
		return turrets;
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
	return {initializeGrid:initializeGrid, addTile:addTile, addTurret:addTurret, getGrid:getGrid, getTurrets:getTurrets,getGridSpot:getGridSpot,setStart:setStart, setEnd:setEnd}
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
