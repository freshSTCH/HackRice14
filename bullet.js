var Bullet = function(pos, velocity, img, growth, rgb){
    var pos = pos, velocity = velocity, img = img;

     var dims = [.3, .3];
     var rect = Rect(pos,dims);

    var hitpos = [];
    var radius = 1;
    var growth = growth || 2; //Math.pow(2, (1/FPS));
    var decay = decay || Math.pow(.5, (1/FPS));
    var rgba = rgba || [0,255,0,1];
    var time = 0;

    var active = true;
    var update = function(timeFactor){
        if(active){
             rect.setPos(rect.pos.add(velocity.scale(timeFactor)));
        }else{
            time += timeFactor;
            radius = growth * Math.log(time);
            rgba[3] *= Math.pow(decay, timeFactor);
            if (time <= 0){
                active = true;
                radius = 0;
            }
        }


        if (room.hittingWall(rect))
        {
            hit();
        }

        // Add sprite animation here
    }

    var draw = function(){
        if(active){
            canvas.putImageEasy(rect,img);
        }else{
            if(rgba[3] > .05){
                canvas.save()

                canvas.beginPath();
                canvas.arc(room.offset[0] + TILESIZE * pos[0], room.offset[1] + TILESIZE * pos[1], radius, 0, 2 * Math.PI);

                canvas.lineWidth = 15;
                canvas.strokeStyle = 'rgba(0,0,0,' + .25 * rgba[3] + ')';
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
        }
    }

    var hit = function(hitpos){
        hitpos = hitpos;
        active = false;
    }

    var isActive = function()
    {
        return active;
    }

    return {isActive:isActive,hit:hit,rect:rect,pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
