function Player(pos, health){
    health = typeof health !== 'undefined' ? health : 10;

    var health = health;
    var dims = [20, 20];
    var rect = Rect(pos, dims);

    var input = function(inputs){
        pass;
    }

    var update = function(multiplier){
        pass;
    }

    var draw = function(){
        pass;
    }

    return {health:health, rect:rect, input:input, update:update, draw:draw};
}