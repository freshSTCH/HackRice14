function Player(pos, health, settings){
    health = typeof health !== 'undefined' ? health : 10;

    var health = health;
    var dims = [20, 20];
    var rect = Rect(pos, dims);
    var speed = 20;

    var input = function(inputs){
        pass;
    }

    var update = function(multiplier){
        vel = [0, 0];
        if(canvas.state[settings.right])
            vel[0] ++;
        if(canvas.state[settings.left])
            vel[0] --;
        if(canvas.state[settings.down])
            vel[1] ++;
        if(canvas.state[settings.up]) // Remember, y axis is flipped in computers because reasons
            vel[1] --;
        vel = vel.unit()
        pos = pos.add(vel.scale(Math.abs(multiplier) * speed))
        // add collision detection with walls and turrets
        // Also check where YOUR bullets are... not which hit you
    }

    var draw = function(){
        pass;
    }

    return {health:health, rect:rect, input:input, update:update, draw:draw};
}