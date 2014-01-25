function Turret(x, y, ai, health=3){
    var x = x, y = y, ai = ai, health = health;
    var width = 20, height = 20;
    var rect = Rect(x, y, width, height);

    function update(timeMultiplier){
        pass;
    }

    function draw(){
        pass;
    }

    return {x:x, y:y, ai:ai, health:health, h:health, rect:rect, r:rect, update:update, draw:draw};
}