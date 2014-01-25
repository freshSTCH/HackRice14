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

Array.prototype.dot = function(b){
    for (var i=0, result=0; i<this.length; i++)
        result += this[i] * b[i];
    return result;
}

function Rect(pos, dims, angle){
    angle = typeof angle !== 'undefined' ? angle : 0;

    var pos = pos, dims = dims, angle = angle;

    var intersectsRect = function(rect){
        isIntersecting = true;
        for (i in [0, 1])
            isIntersecting &= Math.abs(pos[i] - rect.pos[i]) < 0.5 * (dims[i] + rect.dims[i]);
        return isIntersecting;
    }

    var intersectsPoint = function(point){
        isIntersecting = true;
        for (i in [0, 1])
            isIntersecting &= Math.abs(pos[i] - point[i]) < 0.5 * dims[i];
        return isIntersecting;
    }

    return {pos:pos, dims:dims, angle:angle, a:angle, intersectsRect:intersectsRect, intersectsPoint:intersectsPoint};
}