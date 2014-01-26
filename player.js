var Player = function(pos, health, settings){
    health = typeof health !== 'undefined' ? health : 10;

    var health = health;
    var dims = [20, 20];
    var rect = Rect(pos, dims);
    var speed = 20;
    var bullets = [];

    var update = function(timeFactor){
        for(var i = 0; i < bullets.length;i++){bullets[i].update(timeFactor);}

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
        pos = pos.add(vel.scale(Math.abs(timeFactor) * speed));

        var nearestTile = [Math.round(pos[0]), Math.round(pos[1])];
        var tilesToCheck = []
            for (var i=-1; i<=1; i++){
                for (var j=-1; j<=1; j++){
                    var tile = nearestTile.add([i, j]);
                    tilesToCheck.append(tile)
                }
            }
        for (var i=0; i<tilesToCheck.length; i++){
//            if tilesToCheck[i]
        }
        // add collision detection with walls and turrets
        // Also check where YOUR bullets are... not which hit you
    }

    var draw = function(){
        pass;
    }

    return {health:health, rect:rect, bullets:bullets, input:input, update:update, draw:draw};
}
