function Level(grid)
{
	var grid=grid;
	var addEnemy=function(Enemy,angle,x,y){
		grid[x,y] = [Enemy,angle]
	};
	var getGrid=function(){
		return grid
	};
		
}