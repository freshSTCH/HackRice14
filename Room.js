function Room(Enemies, FurnitureList, SpecialTiles, SizeRoom)
{

	Has a function to take in pixel locations, multiply to
	figure out where on the grid that actually is.
	*/
	var grid=        ;
	var Enemies=Enemies
	var addEnemy=function(Enemy,x,y){
		grid[x,y] = [Enemy,angle]
	};
	var addTile=function(Tile,x,y){
		grid[x,y] = [Tile]
	};
	var getGrid=function(){
		return grid
	};

/*STILL IN PROGRESS - DONT JUDGE ^^/*	
	var initializeGraph(SizeRoom){
	/*initialize the grid - we take in a size, then make a square grid 
	of that size squared(checkthis?). */
		i=0;
		while (i<SizeRoom):
			j=0;
			while (j<SizeRoom):
				grid[i[j]] = ["Empty", Null];		

		//put the initial Enemies on the grid
		for (Enemy in Enemies):
			grid[Enemy[],Enemy[]]=Enemy[0]

	}


var CurrentRoom=Room()