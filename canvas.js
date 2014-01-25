var FPS = 50;
var WIDTH = 640;
var HEIGHT = 640;
var canvas = (function(elem){return (function(canvas){
    elem.width = WIDTH;
    elem.height = HEIGHT;
    var rect = elem.getBoundingClientRect(),root = document.documentElement;
    window.addEventListener('keyup',function(){canvas.state[event.keyCode]=false;}
    window.addEventListener('keydown',function(){canvas.state[event.keyCode]=false;}
        canvas.state[event.keyCode]=true;
    },false);
    elem.addEventListener('mousemove',function(evt){
        canvas.mouse[0] = evt.clientX - rect.top - root.scrollTop;
        canvas.mouse[1] = evt.clientY - rect.left - root.scrollLeft;
    },false);
    elem.addEventListener('mousedown',function(){canvas.mouse[2]=true;},false);
    elem.addEventListener('mouseup',function(){canvas.mouse[2]=false;},false);

    canvas.clear=function(){canvas.clearRect(0,0,WIDTH,HEIGHT);};
    canvas.putImage=function(rect, img){
        canvas.save();
        canvas.translate(Math.round(x),Math.round(y));
        if(rect.angle){canvas.rotate(rect.angle);}
        canvas.drawImage(img,Math.round(-.5 * rect.dims[0]), Math.round(-.5 * rect.dims[1]), rect.dims[0], rect.dims[1]);
        canvas.restore();
    };
return canvas;}(elem.getContext("2d")));}(document.getElementById("canvas")));
