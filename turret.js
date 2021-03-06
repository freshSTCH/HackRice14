var Turret = function(pos, ai, health, img){
    health = typeof health !== 'undefined' ? health : 3;

    var health = health, img= img;
    var dims = [1, 1];    //setting
    var rect = Rect(pos, dims);
    var state = {};
    var time = 0; //time since death
    var dead = false;

    var bulletSpeed;

    var update = function(timeFactor){
        if(timeFactor > 0){
            if(!dead){
                state = AI(state);
            }else{
                time += timeFactor;
            }
        }else{
            time += timeFactor;
            if (time <= 0){
                dead = false;
                //img = ... //set the regular image here
            }
        }
    }

    function getImgName()
    {
        if (health > 3)
            return img;
        switch(health)
        {
            case 3:
                return img;

            case 2:
            case 1:
                return "Damaged"+img;

            case 0:
            default:
                return "NearDeath"+img;
        }
    }

    var draw = function(offset){
        var imgName = getImgName();
        canvas.putImageEasy(rect, assets.getImage(imgName));
    }

    var shoot = function(){
        var bulletPos = pos.add(angleToVector(rect.angle).scale(rect.dims[0] / 2));
        room.addEnemyBullet(Bullet(bulletPos, angleToVector(rect.angle).scale(bulletSpeed),assets.getImage("EnemyBullet"), 20, [0,255,0,1], 'turret'));
    }

    var hit = function(){
        health--;
        if (health == 0){
            dead = true;
        }

        assets.playSound("TurretDeath");
        //temporary; I don't have a good "normal" hit sound yet
        //AND this function needs to actually do hurt the turret
    };

    var unhit = function(){
        health++;
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
                    switch (ai.settings){
                        case 'sniper':
                            var range = 13;
                            var speed = ((Math.PI / 4) / FPS);
                            var timer = FPS * 1; //bullets per sec
                            var tolerance = (Math.PI / 16);
                            bulletSpeed = (10 / FPS);
                            break;
                        case 'machinegun':
                            var range = 7;
                            var speed = ((Math.PI / 2) / FPS);
                            var timer = FPS * 5; //bullets per sec
                            var tolerance = (Math.PI / 4);
                            bulletSpeed = (5 / FPS);
                            break;
                        case 'basic':
                            var range = 10;
                            var speed = ((Math.PI / 3) / FPS);
                            var timer = FPS * 2;
                            var tolerance = (Math.PI / 8);
                            bulletSpeed = ( 7 / FPS );
                            break;
                    }

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
    return {pos:pos, ai:ai, health:health, rect:rect, update:update, draw:draw, hit:hit, unhit:unhit};
}
