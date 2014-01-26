function Player(pos, health, settings, img){
    health =  health || 10;


    var dims = [0.47, 0.47];
    var rect = Rect(pos, dims);
    var speed = 0.1;
    var bullets = [];

    var imageDims = [1,1];

    canvas.addMouseDownListener(function(pos)
    {
        var velocity = pos.scale(1/TILESIZE).subtract(rect.pos).unit().scale(0.1);
        console.log("Make bullet");
        assets.getSound("Shoot").currentTime = 0;
        assets.getSound("Shoot").play();

        room.addPlayerBullet(Bullet([rect.pos[0],rect.pos[1]],velocity,assets.getImage("Bullet")));
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
        var oldPos = [rect.pos[0],rect.pos[1]];
        rect.setPos(rect.pos.add(vel.scale(Math.abs(timeFactor) * speed)));

        var collided = room.hittingWall(rect);

        if (collided){
            rect.setPos(oldPos);
        }
        rect.angle = Math.atan2(canvas.mousePos[1]/TILESIZE - rect.pos[1],canvas.mousePos[0]/TILESIZE - rect.pos[0]);
        // add collision detection with walls and turrets
        // Also check where YOUR bullets are... not which hit you
    };

    var draw = function(){

         for(var i = 0; i < bullets.length;i++){bullets[i].draw();}


        canvas.putImageEasy(Rect(rect.pos,imageDims,rect.angle), img);
    };

    return {rect:rect,health:health, rect:rect, bullets:bullets, update:update, draw:draw};
}
