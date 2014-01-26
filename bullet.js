var Bullet = function(pos, velocity, img, growth, rgb){
    var pos = pos, velocity = velocity, img = img;

    var dims = [.3, .3];
    var rect = Rect(pos,dims);

    var hitObj;//room, player

    var radius = 1;
    var growth = growth || 20; //Math.pow(2, (1/FPS));
    var decay = decay || Math.pow(.5, (1/FPS));
    var rgba = rgba || [0,255,0,1];
    var time = 0;

    var state = 'active'; //active, ring, done, stuck
    var update = function(timeFactor){
        switch(state){
            case 'stuck':
            case 'active':
                rect.setPos(rect.pos.add(velocity.scale(timeFactor)));
                break;
            case 'ring':
                time += timeFactor;
                radius = growth * Math.log(time);
                rgba[3] *= Math.pow(decay, timeFactor);
                if (time <= 0){
                    state = 'stuck';
                    if (hitObj == 'player'){
                        for(var i = 0; i < room.players.length; i++){
                            if (room.players[i].rect.interectsRect(rect)){
                                room.players[i].unhit();
                            }
                        }
                    }
                }
                break;
        }


        if (room.hittingTileType("Wall", rect) || room.hittingTileType("Field", rect))
        {
            hit('room');
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
        hitObj = obj
    active = false;
    }

    var reverseHit = function(obj){
        hit(obj);
    }

    var isActive = function()
    {
        return active;
    }

    return {isActive:isActive,hit:hit, reverseHit:reverseHit, rect:rect,pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
