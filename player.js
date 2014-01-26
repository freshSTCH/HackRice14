var Player = function(pos, health, settings, img){
    health = typeof health !== 'undefined' ? health : 10;

    var health = health;
    var dims = [1, 1];
    var rect = Rect(pos, dims);
    var speed = .1;
    var bullets = [];
    var img = img;
    var settings = settings;

    var update = function(timeFactor){
        for(var i = 0; i < bullets.length;i++){bullets[i].update(timeFactor);}

        var vel = [0, 0];
        if(canvas.state[settings.right])
            vel[0] ++;
        if(canvas.state[settings.left])
            vel[0] --;
        if(canvas.state[settings.down])
            vel[1] ++;
        if(canvas.state[settings.up]) // Remember, y axis is flipped in computers because reasons
            vel[1] --;
        vel = vel.unit();
        rect.pos = rect.pos.add(vel.scale(Math.abs(timeFactor) * speed));

        rect.angle = Math.atan2(canvas.mousePos[1]/TILESIZE - rect.pos[1],canvas.mousePos[0]/TILESIZE - rect.pos[0]);

        var nearestTile = [Math.round(pos[0]), Math.round(pos[1])];
        var tilesToCheck = []
            for (var i=-1; i<=1; i++){
                for (var j=-1; j<=1; j++){
                    var tile = nearestTile.add([i, j]);
                    tilesToCheck.push(tile)
                }
            }
        for (var i=0; i<tilesToCheck.length; i++){
//            if tilesToCheck[i]
        }
        // add collision detection with walls and turrets
        // Also check where YOUR bullets are... not which hit you
    }

    var draw = function(){
        var drawRect = Rect([room.TILESIZE * rect.pos[0] + room.offset[0], room.TILESIZE * rect.pos[1] + room.offset[1]], [room.TILESIZE * rect.dims[0], room.TILESIZE*rect.dims[1]]);
        canvas.putImage(drawRect, img);
    }

    return {health:health, rect:rect, bullets:bullets, update:update, draw:draw};
}
