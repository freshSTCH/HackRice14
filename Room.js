function Room(xLength,yLength,Enemies,Tiles)
{
	"use strict";
	/*
	Has a function to take in pixel locations, multiply to
	figure out where on the grid that actually is.
	*/
	var grid=[];
	var Enemies=Enemies
	var Tiles=Tiles

	var initializeGrid()=function(){
		var i=0;
		while (i<SizeRoom):
			var j=0;
			while (j<SizeRoom):
				grid[i][j] = ["Empty";		
	}

	var addEnemy=function(Enemy,x,y){
		grid[x][y] = Enemy
	};
	var addTile=function(Tile,x,y){
		grid[x][y] = Tile
	};
	var getGrid=function(){
		return grid
	};
	var checkSpot=function(pixelX, pixelY){
		//check what is on the grid at the given pixel location
		//double check this formula works
		var gridX=pixelX/floor(xLength) 
		var gridY=floor(pixelY/(yLength))
		return grid[gridX,gridY]
	}
}
