function Player(pos, health, settings, img){
    health =  health || 10;


    var dims = [0.47, 0.47];
    var rect = Rect(pos, dims);
    var speed = 0.1;
    var bullets = [];
    var oldPos = pos;

    var imageDims = [1,1];

    canvas.addMouseDownListener(function(pos)
    {
        var velocity = pos.scale(1/TILESIZE).subtract(rect.pos).unit().scale(0.1);
        console.log("Make bullet");
        assets.playSound("Shoot");

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
        oldPos = [rect.pos[0],rect.pos[1]];
        rect.setPos(rect.pos.add(vel.scale(Math.abs(timeFactor) * speed)));

        var collided = (room.hittingTileType('Wall', rect) || room.hittingTileType('Obstacle', rect)) || room.hittingTileType('End', rect);

        if (collided){
            rect.setPos(oldPos);
        }
        rect.angle = Math.atan2(canvas.mousePos[1]/TILESIZE - rect.pos[1],canvas.mousePos[0]/TILESIZE - rect.pos[0]);
        // add collision detection with walls and turrets
        // Also check where YOUR bullets are... not which hit you
    };

    var undo = function(){
        rect.setPos(oldPos);
    }

    var draw = function(){

         for(var i = 0; i < bullets.length;i++){bullets[i].draw();}


        canvas.putImageEasy(Rect(rect.pos,imageDims,rect.angle), img);

        canvas.font = '32pt Calibri';
        canvas.fillStyle = 'white';
        canvas.fillText("HP:",TILESIZE,1.5*TILESIZE);

        canvas.lineWidth = 5;

        canvas.fillStyle = 'red';
        canvas.beginPath();
        canvas.moveTo(3*TILESIZE,.5*TILESIZE);
        canvas.lineTo((3+6/10*health)*TILESIZE,.5*TILESIZE);
        canvas.lineTo((3+6/10*health)*TILESIZE,1.5*TILESIZE);
        canvas.lineTo(3*TILESIZE,1.5*TILESIZE);
        canvas.closePath();
        canvas.fill();

        canvas.fillStyle = 'white';
        canvas.beginPath();
        canvas.moveTo((3+6/10*health)*TILESIZE,.5*TILESIZE);
        canvas.lineTo(9*TILESIZE,.5*TILESIZE);
        canvas.lineTo(9*TILESIZE,1.5*TILESIZE);
        canvas.lineTo((3+6/10*health)*TILESIZE,1.5*TILESIZE);
        canvas.closePath();
        canvas.fill();

    };

    function hit()
    {
        health -=1;
    }

    return {hit:hit,rect:rect,health:health, rect:rect, bullets:bullets, update:update, draw:draw};
}
