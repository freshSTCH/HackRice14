function Turret(pos, ai, health, img){
    health = typeof health !== 'undefined' ? health : 3;

    var pos = pos, health = health, img= img;
    var dims = [20, 20];    //setting
    var rect = Rect(pos, dims);
    var bullets = [];
    var state = {};


    var update = function(){state = ai(state);}

    var draw = function(offset){
        var drawRect = Rect(tileSize * rect.pos[0] + offset[0], tileSize * rect.pos[1] + offset[1], rect.dim[0], rect.dim[1]);
        canvas.putImage(drawRect, img);
    }

    var shoot = function(speed){
        bullets.push(Bullet(pos, speed))
    }

    return {pos:pos, ai:ai, health:health, rect:rect, update:update, draw:draw};
}


var AI = (function(){
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
                    var diff = rect.pos.subtract(players[i].rect.pos);
                    var targetAngle = Math.atan2(diff[0],diff[1]);
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
                            rect.angle += dirTowardsAngle(rect.angle, target.angle) * speed;
                        }
                    }
                }
            }
            return state;
        }
    }
    //var another AI = function(....
    return {tracker:tracker};
})();
