var Bullet = function(pos, velocity, img, growth, rgb){
    var pos = pos, velocity = velocity, img = img;

     var dims = [.3, .3];
     var rect = Rect(pos,dims);

    var hitpos = [];
    var radius = 0;
    var growth = growth || 1; //pxls?
    var decay = decay || Math.pow(.5,(1/FPS));
    var rgba = rgba || [0,255,0,1]

    var active = true;
    var update = function(timeFactor){
        if(active){
             rect.setPos(rect.pos.add(velocity.scale(timeFactor)));
        }else{
            radius += timeFactor * growth;
            rgba[3] *= Math.pow(decay, timeFactor);
            if (radius < 0){
                active = true;
                radius = 0;
            }
        }


        var corners = rect.corners();

        corners.forEach(function(corner)
        {
            //console.log(corner);
            var rounded = corner.map(function(val){return Math.floor(val);});
            var tile = room.getTypeOfTile(rounded[0],rounded[1]);
            if (tile === "Wall")
                active = false;
            //console.log(tile);
        });

        // Add sprite animation here
    }

    var draw = function(){
        if(active){
            canvas.drawImage(img, TILESIZE * pos[0] + offset[0], TILESIZE * pos[1] + offset[1]);
        }else{
            canvas.beginPath();
            canvas.arc(room.offset[0] + pos[0], room.offset[1] + pos[1], radius, 0, 2 * Math.PI);

            canvas.strokeStyle = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' rgba[2] + ',' + rgba[3] +')'
            canvas.lineWidth = 3;
            canvas.shadowOffsetY = 10;
            canvas.shadowBlur = 5;
            canvas.stroke();
<<<<<<< HEAD

            canvas.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' rgb[2] + ',' + .5 * rgba[3] +')'
            canvas.lineWidth = 1;
            canvas.shadowBlur = 0;
            canvas.shadowOffsetY = 0;
            canvas.stroke();
=======
        }else{
            //canvas.drawImage(img, TILESIZE * pos[0] + room.offset[0], TILESIZE * pos[1] + room.offset[1])
            canvas.putImageEasy(rect,img);
>>>>>>> 0b6a0f3f51ca2cc2bff312096d877dff2492cd51
        }
    }

    var hit = function(hitpos){
        hitpos = hitpos;
        active = false;
    }

    return {pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
