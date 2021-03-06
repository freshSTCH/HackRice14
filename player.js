function Player(pos, health, settings, img, integrity){
    integrity = integrity || 10;


    var dims = [0.47, 0.47];
    var rect = Rect(pos, dims);
    var speed = 0.1;
    var bullets = [];
    var oldPos = pos;
    var time = 0;
    var maxHealth = health;

    var imageDims = [1,1];

    var catchTolerance = 0.125 * Math.PI;

    var bulletSpeed = 5 / FPS; //tiles per second
    var timer = FPS / 2;

    var dead = false;
    var superDead = false;
    var firstMouseUp = false;//has happened


    var update = function(timeFactor){

        time--;
        if(!canvas.mouseDown)
            firstMouseUp=true;
        if(firstMouseUp && canvas.mouseDown && timeFactor > 0 && time < 0){
            var velocity = canvas.mousePos.scale(1/TILESIZE).subtract(rect.pos).unit().scale(bulletSpeed);
            assets.playSound("Shoot");
            time = timer;
            room.addPlayerBullet(Bullet([rect.pos[0],rect.pos[1]],velocity.unit().scale(bulletSpeed),assets.getImage("Bullet"), 20, [0,255,0,1], 'player'));
        }

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

        canvas.font = '26pt Calibri';
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


        canvas.font = '26pt Calibri';
        canvas.fillStyle = 'white';
        canvas.fillText("STC:",10*TILESIZE,1.5*TILESIZE);

        canvas.lineWidth = 5;

        canvas.fillStyle = 'purple';
        canvas.beginPath();
        canvas.moveTo(13*TILESIZE,.5*TILESIZE);
        canvas.lineTo((13+6/10*integrity)*TILESIZE,.5*TILESIZE);
        canvas.lineTo((13+6/10*integrity)*TILESIZE,1.5*TILESIZE);
        canvas.lineTo(13*TILESIZE,1.5*TILESIZE);
        canvas.closePath();
        canvas.fill();

        canvas.fillStyle = 'grey';
        canvas.beginPath();
        canvas.moveTo((13+6/10*integrity)*TILESIZE,.5*TILESIZE);
        canvas.lineTo(19*TILESIZE,.5*TILESIZE);
        canvas.lineTo(19*TILESIZE,1.5*TILESIZE);
        canvas.lineTo((13+6/10*integrity)*TILESIZE,1.5*TILESIZE);
        canvas.closePath();
        canvas.fill();



    };

    function hit()
    {
        health -= 1;
        if (health <= 0){
            health = 0;
            dead = true;
        }
        assets.playSound("PlayerTakingDamage");
    }

    function unshoot(vel){
        var angleToBullet = vectorToAngle(vel);
        var angleOff = minAngleBetween(angleToBullet, rect.angle);
        if (angleOff > catchTolerance){
            health -= 1;
            if (health <= 0){
                health = 0;
                dead = true;
            }
            integrity -= 1;
            if (integrity <= 0){
                integrity = 0;
                superDead = true;
            }
        }
        assets.playSound("Shoot");
    }

    function reverseHit(){
        health -= 1;
        if (health <= 0){
            health = 0;
            dead = true;
        }
        integrity -= 1;
        if (integrity <= 0){
            integrity = 0;
            superDead = true;
        }
        assets.playSound("PlayerTakingDamage");
    }

    function unhit(){
        health += 1;
        health = Math.min(health, maxHealth);
    }

    function unhitMissed(){
        integrity -= 1;
        if (integrity <= 0){
            integrity = 0;
            superDead = true;
        }
    }

    function unshootMissed(){
        integrity -= 1;
        if (integrity <= 0){
            integrity = 0;
            superDead = true;
        }
    }

    function isDead()
    {
        return dead;
    }

    function isSuperDead(){
        return superDead;
    }

    return {unshootMissed:unshootMissed, isSuperDead:isSuperDead, unhitMissed:unhitMissed, unhit:unhit, reverseHit:reverseHit, unshoot:unshoot, isDead:isDead,undo:undo,hit:hit,rect:rect,health:health, rect:rect, bullets:bullets, update:update, draw:draw};
}
