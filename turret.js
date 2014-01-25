function Turret(pos, ai, health){
    health = typeof health !== 'undefined' ? health : 3;

    var pos = pos, ai = ai, health = health;
    var dims = [20, 20];
    var rect = Rect(pos, dims);

    var update = function(multiplier){
        ai();
    }

    var draw = function(){
        pass;
    }

    return {pos:pos, ai:ai, health:health, rect:rect, update:update, draw:draw};
}

//tracking = function(range, 
