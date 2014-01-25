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
			var y=0;
			while (y<lengthYTiles){
				grid[x][y] = [Null];		

	}}}
	var addTile=function(Tile,x,y){
		grid[x][y] = Tile;
	};
	var getGrid=function(){
		return grid
	};
	var getGridSpot=function(pixelX, pixelY){
		//check what tile is on the grid at the given pixel location
		//!I need to double check this formula works!
		var gridX=floor(pixelX/TileSize);
		var gridY=floor(pixelY/TileSize);
		return grid[gridX,gridY];
	}


	initializeGrid()


}

