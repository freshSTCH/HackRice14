var Bullet = function(pos, velocity, img){
    var pos = pos, velocity = velocity, img = img;

    var update = function(timeFactor){
        pos = pos.add(velocity.scale(timeFactor));
        // Add sprite animation here
    }

    var draw = function(){
        canvas.drawImage(img, TILESIZE * pos[0] + offset[0], TILESIZE * pos[1] + offset[1])
    }

    return {pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
