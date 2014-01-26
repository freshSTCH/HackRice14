function TimeMachine(pos)
{
    var dim = [1,1]
    var rect = Rect(pos,dim);
    var img = assets.getImage("TimeMachine");
    var health = 10;

    var radsPerTick = .02;
    var reverse;

    var update = function(timeFactor){
        if (!reverse)
            rect.angle += radsPerTick;
        else
            rect.angle -= radsPerTick*4;

    }

    var draw = function(){
        canvas.putImageEasy(rect, img);
    }

    function hit()
    {
        health -=1;
        if (health === 0)
        {
            reverse = true;
            alert("REVERSE TIME");
        }

    }


    return {hit:hit,rect:rect,update:update,draw:draw};

}