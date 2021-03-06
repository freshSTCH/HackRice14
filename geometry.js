Array.prototype.add = function(b){
    for (var i=0, result=[]; i<this.length; i++)
        result[i] = this[i] + b[i];
    return result;
}

Array.prototype.subtract = function(b){
    for (var i=0, result=[]; i<this.length; i++)
        result[i] = this[i] - b[i];
    return result;
}

Array.prototype.multiply = function(b){
    for (var i=0, result=[]; i<this.length; i++)
        result[i] = this[i] * b[i];
    return result;
}

Array.prototype.scale = function(s){
    for (var i=0, result=[]; i<this.length; i++)
        result[i] = this[i] * s;
    return result;
}

Array.prototype.dot = function(b){
    for (var i=0, result=0; i<this.length; i++)
        result += this[i] * b[i];
    return result;
}

Array.prototype.magnitude = function(){
    return Math.sqrt(this.dot(this));
}

Array.prototype.dist = function(b){
    return this.subtract(b).magnitude()
}

Array.prototype.unit = function(){
    var mag = this.magnitude();
    
    if (mag === 0)
        mag = 1;

    var result = [];
    for (var i=0; i<this.length; i++)
        result[i] = this[i] / mag;
    return result;
}

function angleToVector(angle){
    return [Math.cos(angle), Math.sin(angle)];
}

function vectorToAngle(vector){
    return Math.atan2(vector[1], vector[0]);
}

function minAngleBetween(angle1, angle2){
    diff = (angle1 - angle2) % (2 * Math.PI);
    diff = diff > 0 ? diff : diff + 2 * Math.PI;
    diff = Math.min(diff, 2*Math.PI - diff);
    return diff;
}

function dirTowardsAngle(angle1, angle2){
    diff = (angle2 - angle1) % (2 * Math.PI);
    diff = diff > 0 ? diff : diff + 2 * Math.PI;
    if (diff < Math.PI)
        return 1;
    return -1;
}





function Rect(pos, dims, angle){
    angle = typeof angle !== 'undefined' ? angle : 0;

    var intersectsRect = function(rect){
        isIntersecting = true;
        for (var i=0; i<2; i++)
            isIntersecting &= Math.abs(pos[i] - rect.pos[i]) < 0.5 * (dims[i] + rect.dims[i]);
        return isIntersecting;
    }

    var intersectsPoint = function(point){
        isIntersecting = true;
        for (var i=0; i<2; i++)
            isIntersecting &= Math.abs(pos[i] - point[i]) < 0.5 * dims[i];
        return isIntersecting;
    }

    var corners = function(){
        return [
            [pos[0] + dims[0]*.5,pos[1]+dims[1]*.5],
            [pos[0] - dims[0]*.5,pos[1]+dims[1]*.5],
            [pos[0] + dims[0]*.5,pos[1]-dims[1]*.5],
            [pos[0] - dims[0]*.5,pos[1]-dims[1]*.5]

        ];
    }

    function setPos(newPos)
    {
        pos[0] = newPos[0];
        pos[1] = newPos[1];
    }

    return {setPos:setPos,corners:corners,pos:pos, dims:dims, angle:angle, a:angle, intersectsRect:intersectsRect, intersectsPoint:intersectsPoint};
}