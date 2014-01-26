var Bullet = function(pos, velocity, img, growth, rgba, owner){
    var pos = pos, velocity = velocity, img = img;

    var dims = [.3, .3];
    var rect = Rect(pos,dims);

    var hitObj;//room, player
    var owner = owner;// turret, player

    var radius = 1;
    var growth = growth || 20; //Math.pow(2, (1/FPS));
    var decay = decay || Math.pow(.5, (1/FPS));
    var rgba = rgba || [0,255,0,1];
    var time = 0;

    var state = 'active'; //active, ring, done, stuck
    var update = function(timeFactor){
        switch(state){
            case 'stuck':
                rect.setPos(rect.pos.add(velocity.scale(timeFactor * TILESIZE)));
                var unstuck = true;
                if (room.hittingTileType("Wall", rect) || room.hittingTileType("Field", rect))
                    unstuck = false;
                for(var i = 0; i < room.players.length; i++){
                    if (room.players[i].rect.intersectsRect(rect))
                        unstuck = false;
                }
                for(var i = 0; i < room.turrets.length; i++){
                    if (room.turrets[i].rect.intersectsRect(rect))
                        unstuck = false;
                }
                if (room.getTimeMachine().rect.intersectsRect(rect))
                    unstuck = false;
                if (unstuck)
                    state = 'active';
                break;
            case 'active':
                rect.setPos(rect.pos.add(velocity.scale(timeFactor * TILESIZE)));
                if (room.hittingTileType("Wall", rect) || room.hittingTileType("Field", rect)){
                    if (timeFactor > 0){
                        hit('room');
                    }
                    else if (timeFactor < 0){
                        reverseHit('room');
                        if (owner == "player"){
                            room.players[0].unshootMissed(); // CHANGE THIS IF MULTIPLAYER IS IMPLEMENTED
                        }
                    }
                }

                for(var i = 0; i< room.players.length;i++){
                    if(room.players[i].rect.intersectsRect(rect)){
                        if (timeFactor > 0){
                            if(owner == 'player'){
                                //do nothing
                            }else{
                                room.players[i].hit();
                                hit('player');
                            }
                        }else{
                            reverseHit('player');
                            if(owner=='player'){
                                room.players[i].unshoot(velocity);
                            }else{
                                room.players[i].reverseHit('player');
                            }
                        }
                    }
                }

                for(var i = 0; i< room.turrets.length;i++){
                    if(room.turrets[i].rect.intersectsRect(rect)){
                        if(owner == 'player'){
                            if (timeFactor > 0){
                                hit("turret");
                                room.turrets[i].hit();
                            }else{
                                room.turrets[i].unhit();
                                reverseHit('turret');
                            }
                        }else if(owner == 'turret'){
                            if(timeFactor < 0){
                                reverseHit('turret');
                            }
                        }
                    }
                }

                if(room.getTimeMachine().rect.intersectsRect(rect)){
                    //also check for owner == 'player'?
                    if (timeFactor > 0){
                        hit("timeMachine");
                    }
                    room.getTimeMachine().hit();
                    if (room.getTimeMachine().isDead()) {
                        room.reverseTimeFactor(); // the time machine should do this internally... but whatever
                    }
                }
                break;
            case 'ring':
                time += timeFactor;
                radius = growth * Math.log(time);
                rgba[3] *= Math.pow(decay, timeFactor);
                if (time <= 0){
                    state = 'stuck';
                    if (hitObj == 'player'){
                        var paradox = true;
                        for(var i = 0; i < room.players.length; i++){
                            if (room.players[i].rect.intersectsRect(rect)){
                                room.players[i].unhit();
                                paradox = false;
                            }
                        }
                        if (paradox) 
                            room.players[0].unhitMissed();
                    }
                    else if (hitObj == "turret"){
                        for (var i = 0; i < room.turrets.length; i++){
                            if (room.turrets[i].rect.intersectsRect(rect)){
                                room.turrets[i].unhit();
                            }
                        }
                    }
                    else if (hitObj == 'timeMachine'){
                        room.getTimeMachine().unhit();
                    }
                }
                break;
        }

        // Add sprite animation here
    }

    var draw = function(){
        switch(state){
            case 'active':
            case 'stuck':
                canvas.putImageEasy(rect,img);
                break;
            case 'ring':
                if(rgba[3] > .05){
                    canvas.save();

                    canvas.beginPath();
                    canvas.arc(room.offset[0] + TILESIZE * pos[0], room.offset[1] + TILESIZE * pos[1], radius, 0, 2 * Math.PI);

                    canvas.lineWidth = 15;
                    canvas.strokeStyle = 'rgba(0,0,0,' + (.25 * rgba[3]) + ')';
                    canvas.stroke();

                    canvas.lineWidth = 3;
                    canvas.strokeStyle = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] +')';
                    canvas.stroke();

                    canvas.strokeStyle = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + .5 * rgba[3] +')';
                    canvas.lineWidth = 15;
                    /*
                    //turns out shadows are ugly
                    canvas.shadowColor = 'black'
                    canvas.shadowOffsetY = 10;
                    canvas.shadowBlur = 5;
                    */
                    canvas.stroke();


                    canvas.restore();
                }
                break;
        }
    };

    var hit = function(obj){
        hitObj = obj;
        state = 'ring';
    }
    var getState = function(){
        return state;
    }
    var reverseHit = function(){
        state = 'done'
    }

    return {reverseHit:reverseHit, getState:getState, hit:hit, rect:rect,pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
