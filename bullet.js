function Bullet(pos, velocity, img){
    var pos = pos, velocity = velocity, img = img;

    var update = function(multiplier){
        pos = pos.add(velocity.scale(multiplier));
        // Add sprite animation here
    }

    var draw = function(){
        canvas.drawImage(img, tileSize * pos[0] + offset[0], tileSize * pos[1] + offset[1])
    }

    return {pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}
