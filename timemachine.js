function TimeMachine(pos)
{
    var dim = [1,1]
    var rect = Rect(pos,dim);
    var img = "TimeMachine";
    var health = 10;

    var radsPerTick = .02;
    var reverse;

    var update = function(timeFactor){
        if (!reverse)
            rect.angle += radsPerTick;
        else
            rect.angle -= radsPerTick*4;

    }

    function getImgName()
    {
        switch (health)
        {
            case 10:
                return img;

            case 9:
            case 8:
            case 7:
                return "SlightlyDamaged"+img;

            case 6:
            case 5:
            case 4:
                return "ModeratelyDamaged"+img;

            case 3:
            case 2:
            case 1:
                return "HeavilyDamaged"+img;

            case 0:
            default:
                return "NearDeath"+img;

        }
    }

    var draw = function(){
        canvas.putImageEasy(rect, assets.getImage(getImgName()));
    }

    function hit()
    {
        health -=1;
        assets.playSound("TimeMachineTakingDamage")
        if (health === 0)
        {
            assets.playSound("TimeMachineRightBeforeExplosion")
            reverse = true;
            //assets.playSound("TimeTurningBackalt")
            assets.playSound("TimeTurningBack")


        }

    }

    function isDead()
    {
        return reverse;

    }


    return {isDead:isDead,hit:hit,rect:rect,update:update,draw:draw};

}