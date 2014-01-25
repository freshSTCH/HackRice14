function Point(x, y)
{
    var x = x, var y = y;

    function isInRect(rect)
    {
        var c1 = Math.abs(x - rect.x) < 0.5 * rect.width;
        var c2 = Math.abs(y - rect.y) < 0.5 * rect.height;
        return c1 && c2
    }

    return {x:x, y:y, isInRect:isInRect};
}

function Rect(x, y, width, height, angle=0)
{
    var x = x, y = y, width = width, height = height, angle = angle;

    function isInRect(rect)
    {
        var c1 = Math.abs(x - rect.x) < 0.5 * (width + rect.width);
        var c2 = Math.abs(y - rect.y) < 0.5 * (height + rect.height);
        return c1 && c2
    }

    return {x:x, y:y, width:width, w:width, height:height, h:height, angle:angle, a:angle, isInRect:isInRect};
}