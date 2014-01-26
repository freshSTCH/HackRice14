var Bullet = function(pos, velocity, img, growth){
    var pos = pos, velocity = velocity, img = img;

    var hitpos = [];
    var radius = 0;
    var growth = growth || 1; //pxls?

    var active = True;
    var update = function(timeFactor){
        if(active){
            pos = pos.add(velocity.scale(timeFactor));
        }else{
            radius += timeFactor * growth;
            if (radius < 0){
                active = true;
                radius = 0;
            }
        }
        // Add sprite animation here
    }

    var draw = function(){
        if(velocity == [0,0]){
            canvas.beginPath();
            canvas.arc(room.offset[0] + pos[0], room.offset[1] + pos[1], radius, 0, 2 * Math.PI);
            canvas.lineWidth = 1;
            canvas.stroke();
            canvas.lineWidth = 3;
            canvas.shadowOffsetY = 10;
            canvas.shadowBlur = 5;
            canvas.stroke();
        }else{
            canvas.drawImage(img, TILESIZE * pos[0] + offset[0], TILESIZE * pos[1] + offset[1])
        }
    }

    var hit = function(hitpos){
        hitpos = hitpos;
        active = false;
    }

    return {pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
