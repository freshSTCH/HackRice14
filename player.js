var Player = function(pos, health, settings, img){
    health =  health || 10;

    var health = health;
    var dims = [1, 1];
    var rect = Rect(pos, dims);
    var speed = .1;
    var bullets = [];
    var img = img;
    var settings = settings;

    canvas.addMouseDownListener(function(pos)
    {
        var velocity = pos.scale(1/TILESIZE).subtract(rect.pos).unit().scale(.1);
        console.log("Make bullet");

        room.addBullet(Bullet(rect.pos,velocity,assets.getImage("Wall")));
    });

    var update = function(timeFactor){

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
        new_pos = rect.pos.add(vel.scale(Math.abs(timeFactor) * speed));

        var collided = false;
        var nearestTile = [Math.round(pos[0]), Math.round(pos[1])];
        var tilesToCheck = []
            for (var i=-1; i<=1; i++){
                for (var j=-1; j<=1; j++){
                    var tile = nearestTile.add([i, j]);
                    tilesToCheck.push(tile)
                }
            }
        for (var i=0; i<tilesToCheck.length; i++){
            if (room.tileToRect(tilesToCheck[i]).intersectsRect(rect))
                collided = true
        }
        if (!collided){
            rect.pos = new_pos;
        }
        rect.angle = Math.atan2(canvas.mousePos[1]/TILESIZE - rect.pos[1],canvas.mousePos[0]/TILESIZE - rect.pos[0]);
        // add collision detection with walls and turrets
        // Also check where YOUR bullets are... not which hit you
    }

    var draw = function(){

         for(var i = 0; i < bullets.length;i++){bullets[i].draw();}


        canvas.putImage(rect, img);
    }

    return {health:health, rect:rect, bullets:bullets, update:update, draw:draw};
}
