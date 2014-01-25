function Room(Enemies, FurnitureList, SpecialTiles)
{
	var grid=grid;

	var addEnemy=function(Enemy,x,y){
		grid[x,y] = [Enemy,angle]
	};
	var addTile=function(Tile,x,y)
		grid[x,y] = [Tile]
	};
	var getGrid=function(){
		return grid
	};

}