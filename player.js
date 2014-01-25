function Player(x, y, health=10){
    var x = x, y = y, health = health;
    var width = 20, height = 20;
    var rect = Rect(x, y, width, height);

    function update(timeMultiplier){
        pass;
    }

    function draw(){
        pass;
    }

    return {x:x, y:y, health:health, h:health, rect:rect, r:rect};
}