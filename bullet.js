var Bullet = function(pos, velocity, img, growth){

     var dims = [.3, .3];
     var rect = Rect(pos,dims);

    var hitpos = [];
    var radius = 0;
    var growth = growth || 1; //pxls?

    var active = true;
    var update = function(timeFactor){
        if(active){
             rect.setPos(rect.pos.add(velocity.scale(timeFactor)));
        }else{
            radius += timeFactor * growth;
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
            //canvas.drawImage(img, TILESIZE * pos[0] + room.offset[0], TILESIZE * pos[1] + room.offset[1])
            canvas.putImageEasy(rect,img);
        }
    }

    var hit = function(hitpos){
        hitpos = hitpos;
        active = false;
    }

    return {pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
