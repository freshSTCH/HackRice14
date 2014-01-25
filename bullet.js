function Bullet(pos, velocity){
    var pos = pos, velocity = velocity;

    var update = function(multiplier){
        pos = pos.add(velocity.scale(multiplier));
        // Add sprite animation here
    }

    var draw = function(){
        pass;
    }

    return {pos:pos, velocity:velocity, vel:velocity, v:velocity, update:update, draw:draw};
}