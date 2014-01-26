var Turret = function(pos, ai, health, img){
    health = typeof health !== 'undefined' ? health : 3;

    var health = health, img= img;
    var dims = [1, 1];    //setting
    var rect = Rect(pos, dims);
    var state = {};

    var update = function(timeFactor){
        state = AI(state);
    }

    var draw = function(offset){
        canvas.putImageEasy(rect, img);
    }

    var shoot = function(){
        room.addEnemyBullet(Bullet([pos[0],pos[1]], angleToVector(rect.angle).scale(.01),assets.getImage("EnemyBullet")));
    }

    var hit = function(){

    }

    //AI's
    var AI = (function(ai){
        switch(ai.type){
            case 'simple':
                return (function (settings) {
                    var radsPerSecond = .01;

                    var timeTillNextShot = 0;

                    function update()
                    {
                        rect.angle += radsPerSecond;
                        if (timeTillNextShot === 0)
                        {
                            shoot();
                            timeTillNextShot = 100;
                        }
                        else
                            timeTillNextShot -=1;
                    }
                    return update;
                })(ai.settings);
            break;
                             
            case 'tracker':
            default:
                return (function(settings){//range, speed, timer, tolerance, bulletSpeed
                    range = settings.range || 500;
                    speed = settings.speed || ((Math.PI / 2) / FPS);
                    timer = settings.timer || (FPS / 2);
                    tolerance = settings.tolerance || (Math.PI / 2);
                    bulletSpeed = settings.bulletSpeed || (1 / FPS);

                    return function(state){
                        if (state.timer == undefined){
                            state.timer = 0;
                        }
                        state.timer -= 1;
                        for(var i = 0; i < room.players.length;i++){
                            if(room.players[i].rect.pos.dist(rect.pos) < range){

                                var targetAngle = vectorToAngle(room.players[i].rect.pos.subtract(rect.pos));

                                if(minAngleBetween(targetAngle, rect.angle) < speed){
                                    rect.angle = targetAngle;
                                }else{
                                    rect.angle += dirTowardsAngle(rect.angle, targetAngle) * speed;
                                }

                                if(minAngleBetween(targetAngle, rect.angle) < tolerance){
                                    if (state.timer < 0){
                                        shoot(bulletSpeed);
                                        state.timer = timer;
                                    }
                                }
                            }
                        }
                        return state;
                    }
                })(ai.settings);
            break;
        }
    })(ai);
    return {pos:pos, ai:ai, health:health, rect:rect, update:update, draw:draw};
}
