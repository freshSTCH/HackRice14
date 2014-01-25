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

