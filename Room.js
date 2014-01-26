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



    var Bullet = function(pos, velocity, img){
        var pos = pos, velocity = velocity, img = img;

        var update = function(multiplier){
            pos = pos.add(velocity.scale(multiplier));
            // Add sprite animation here
        }

        var draw = function(){
            canvas.drawImage(img, tileSize * pos[0] + offset[0], tileSize * pos[1] + offset[1])
        }

        return {pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
    }

    var Turret = function(pos, ai, health, img){
        health = typeof health !== 'undefined' ? health : 3;

        var pos = pos, health = health, img= img;
        var dims = [20, 20];    //setting
        var rect = Rect(pos, dims);
        var bullets = [];
        var state = {};


        var update = function(timeFactor){
            for(var i = 0; i < bullets.length;i++){
                bullets[i].update(timeFactor);
            }
            state = ai(state);
        }

        var draw = function(offset){
            var drawRect = Rect(tileSize * rect.pos[0] + offset[0], tileSize * rect.pos[1] + offset[1], rect.dim[0], rect.dim[1]);
            canvas.putImage(drawRect, img);
        }

        var shoot = function(speed){
            bullets.push(Bullet(pos, angleToVector(rect.angle).scale(speed)));
        }


        //AI's
        var tracker = function(range, speed, timer, tolerance, bulletSpeed){
            range = range || 500;
            speed = speed || ((Math.PI / 2) / FPS);
            timer = timer || (FPS / 2);
            tolerance = tolerance || (Math.PI / 2);
            bulletSpeed = bulletSpeed || (1 / FPS);

            return function(state){
                if (state.timer == undefined){
                    state.timer = 0;
                    state.tracking = false;
                }
                for(var i = 0; i < players.length;i++){
                    if(players[i].rect.pos.dist(pos) < range){
                        var targetAngle = vectorToAngle(rect.pos.subtract(players[i].rect.pos));
                        if(minAngleBetween(targetAngle, rect.angle) < tolerance){

                            if(state.tracking = false){
                                state.timer = 0;
                            }
                            state.tracking = true;
                            state.timer -= 1;
                            if (state.timer < 0){
                                shoot(bulletSpeed);
                            }
                            state.timer = timer;

                            if(minAngleBetween(targetAngle, rect.angle) < speed){
                                rect.angle = targetAngle;
                            }else{
                                rect.angle += dirTowardsAngle(rect.angle, targetAngle) * speed;
                            }
                        }
                    }
                }
                return state;
            }
        }

        return {pos:pos, ai:ai, health:health, rect:rect, update:update, draw:draw};
    }

    var Player = function(pos, health, settings){
        health = typeof health !== 'undefined' ? health : 10;

        var health = health;
        var dims = [20, 20];
        var rect = Rect(pos, dims);
        var speed = 20;
        var bullets = [];

        var input = function(inputs){
            pass;
        }

        var update = function(multiplier){
            vel = [0, 0];
            if(canvas.state[settings.right])
                vel[0] ++;
            if(canvas.state[settings.left])
                vel[0] --;
            if(canvas.state[settings.down])
                vel[1] ++;
            if(canvas.state[settings.up]) // Remember, y axis is flipped in computers because reasons
                vel[1] --;
            vel = vel.unit();
            pos = pos.add(vel.scale(Math.abs(multiplier) * speed));

            var nearestTile = [Math.round(pos[0]), Math.round(pos[1])];
            var tilesToCheck = []
                for (var i=-1; i<=1; i++){
                    for (var j=-1, j<=1, j++){
                        var tile = nearestTile.add([i, j]);
                        tilesToCheck.append(tile)
                    }
                }
            for (var i=0; i<tilesToCheck.length; i++){
                if tilesToCheck[i]
            }
            // add collision detection with walls and turrets
            // Also check where YOUR bullets are... not which hit you
        }

        var draw = function(){
            pass;
        }

        return {health:health, rect:rect, bullets:bullets, input:input, update:update, draw:draw};
    }

    return {initializeGrid:initializeGrid, addTile:addTile, addTurret:addTurret, getGrid:getGrid, getTurrets:getTurrets,getGridSpot:getGridSpot,setStart:setStart, setEnd:setEnd, update:update, draw:draw}

}
