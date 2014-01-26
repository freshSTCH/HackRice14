function Room(lengthXTiles,lengthYTiles)
{
	"use strict";
	/*
	Stores tiles in a grid, stores enemies in a seperate array
	*/

	
	var tileSize=TILESIZE;
	var lengthXTiles=lengthXTiles;
	var lengthYTiles=lengthYTiles;

	var grid=new Array(lengthXTiles);
	var StartTile;
	var EndTile;

    var timeFactor = 1;
    var pos = [0,0];
    var players = [];
    var turrets = [];

    var update = function(){
        for (var i = 0; i < turrets.length; i++){turrets[i].update(timeFactor);}
        for (var i = 0; i < players.length; i++){players[i].update(timeFactor);}
    };

    var draw = function(){
        turrets.forEach(function(turret) {turret.draw(pos)})
        bullets.forEach(function(bullet) {bullet.draw(pos)})
        //draw all the tiles
        for (var x=0; x<lengthXTiles; x++){
        	for (var y=0; y<lengthYTiles; y++){
        		var tilename = grid[x][y];
        		var tileImage = assets.getImage(tilename);
        		canvas.drawImage(tileImage, pos[0] + x*tileSize, pos[1] + y*tileSize, tileSize, tileSize);
        	};
        };
    };

    //Grid Initialization functions
    //
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
		var gridX=Math.floor(pixelX/tileSize);
		var gridY=Math.floor(pixelY/tileSize);
		return grid[gridX][gridY];
	};
	var setStart=function(x, y){
		addTile("Start",x,y);
		StartTile=[x,y];
	};
	var setEnd=function(x, y){
		addTile("End",x,y);
		EndTile=[x,y];
	};
	
	initializeGrid();
    //end Grid initialization
	return {initializeGrid:initializeGrid, addTile:addTile, addTurret:addTurret, getGrid:getGrid, getTurrets:getTurrets,getGridSpot:getGridSpot,setStart:setStart, setEnd:setEnd, update:update, draw:draw}
}
