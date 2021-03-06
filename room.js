function Room(lengthXTiles,lengthYTiles)
{
    "use strict";
    /*
       Stores tiles in a grid, stores enemies in a seperate array
       */

    var grid=new Array(lengthXTiles);
    var StartTile;
    var EndTile;

    var timeFactor = 1;
    var pos = [0,0];
    var players = [];
    var turrets = [];

    var enemyBullets = [];
    var playerBullets = [];
    var timeMachine;


    var offset = [0,0];

    var update = function(){
        turrets.forEach(function(turret){turret.update(timeFactor);});
        players.forEach(function(player){player.update(timeFactor);});
        enemyBullets.forEach(function(bullet){bullet.update(timeFactor);});
        playerBullets.forEach(function(bullet){bullet.update(timeFactor);});
        timeMachine.update();


        players.forEach(function(player){
            turrets.forEach(function(turret){
                if (turret.rect.intersectsRect(player.rect))
                {
                    player.undo();
                }
            })
        });
    };

    var draw = function(){
        for (var x=0; x<lengthXTiles; x++){
                for (var y=0; y<lengthYTiles; y++){
                    var tilename = grid[x][y];
                    var tileImage = assets.getImage(tilename);
                    canvas.drawImage(tileImage, pos[0] + x*TILESIZE, pos[1] + y*TILESIZE, TILESIZE, TILESIZE);
                }
            }

        
        turrets.forEach(function(turret) {turret.draw(pos);});
        enemyBullets.forEach(function(bullet) {bullet.draw(pos);});
        playerBullets.forEach(function(bullet) {bullet.draw(pos);});
        players.forEach(function(player) {player.draw(pos);});
        timeMachine.draw();

            
    };

    //Grid Initialization functions
    //
    var addEnemyBullet = function(bullet)
    {
        enemyBullets.push(bullet);
    };

    var addPlayerBullet = function(bullet)
    {
        playerBullets.push(bullet);
    }

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
        var gridX=Math.floor(pixelX/TILESIZE);
        var gridY=Math.floor(pixelY/TILESIZE);
        return grid[gridX][gridY];
    };

    var getTypeOfTile = function(x, y){

        if (x<0||y<0||x>=lengthXTiles||y>=lengthYTiles)
            return "Wall";
        else
            return grid[x][y];
    }

    var tileToRect = function(x, y){
        return Rect([x, y], [TILESIZE, TILESIZE]);
    }

    var setStart=function(x, y){
        addTile("Start",x,y);
        StartTile=[x,y];


        var player = Player([x+.5,y+.5],10,{"right":68,"left":65,"up":87,"down":83},assets.getImage("Player"));
        players.push(player);


    };
    var setEnd=function(x, y){
        addTile("End",x,y);
        EndTile=[x,y];
        timeMachine = TimeMachine([x+.5,y+.5]);
    };

    var hittingTileType = function(type, rect)
    {
        var corners = rect.corners();

        var result = false;

        corners.forEach(function(corner)
        {
            var rounded = corner.map(function(val){return Math.floor(val);});
            var tile = room.getTypeOfTile(rounded[0],rounded[1]);
            if (tile === type)
                result = true;
        });

        return result;
    }

    function isGameOver()
    {
        return isGameLost() || isGameWon();
    }

    function isPlayerDead()
    {
        return players[0].isDead();
    }

    function isParadox(){
        return players[0].isSuperDead();
    }

    function isGameWon()
    {

        if (timeFactor > 0)
            return false;

        if (!hittingTileType("Start",players[0].rect))
        {
            return false;
        }

        for (var i = playerBullets.length - 1; i >= 0; i--) {
            if (playerBullets[i].getState() != "done")
                return false;
        }
        return true;


    }

    var getTimeMachine = function(){
        return timeMachine;
    };
    var reverseTimeFactor = function(){
        timeFactor *= -1;
    }

    initializeGrid();
    //end Grid initialization
    //
    return {reverseTimeFactor:reverseTimeFactor, getTimeMachine:getTimeMachine, turrets:turrets, isGameWon:isGameWon,isPlayerDead:isPlayerDead, isParadox:isParadox,isGameOver:isGameOver,hittingTileType:hittingTileType,getTypeOfTile:getTypeOfTile,addEnemyBullet:addEnemyBullet,addPlayerBullet:addPlayerBullet,offset:offset,players:players,initializeGrid:initializeGrid, addTile:addTile, addTurret:addTurret, getGrid:getGrid, getTurrets:getTurrets,getGridSpot:getGridSpot,setStart:setStart, setEnd:setEnd, update:update, draw:draw}

}
