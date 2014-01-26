var FPS = 50;
var WIDTH = 640;
var HEIGHT = 640;
var TILESIZE = 32;
var canvas = (function(elem){return (function(canvas){
    elem.width = WIDTH;
    elem.height = HEIGHT;

    var mousePos = [0,0];
    var mouseDown = false;
    var mouseDownListeners = [];

    canvas.addMouseDownListener = function(callback)
    {
        mouseDownListeners.push(callback);
        return mouseDownListeners.length-1;
    };

    canvas.removeMouseDownListener = function(id)
    {
        mouseDownListeners[id] = null;
    };

    canvas.state = {};


    var rect = elem.getBoundingClientRect(),root = document.documentElement;
    window.addEventListener('keyup',function(){canvas.state[event.keyCode]=false;},false);
    window.addEventListener('keydown',function(){canvas.state[event.keyCode]=true;},false);

    elem.addEventListener('mousemove',function(evt){
        mousePos[0] = evt.clientX - rect.left + root.scrollLeft;
        mousePos[1] = evt.clientY - rect.top + root.scrollTop;
    },false);

    elem.addEventListener('mousedown',function(){
        mouseDown=true; 
        mouseDownListeners.forEach(function(callback){
            if(callback)
                callback(mousePos);
        });
    },false);

    elem.addEventListener('mouseup',function(){
        mouseDown=false;
    },false);

    canvas.clear=function(){canvas.clearRect(0,0,WIDTH,HEIGHT);};
    canvas.putImage=function(rect, img){
        canvas.save();
        canvas.translate(Math.round(rect.pos[0]),Math.round(rect.pos[1]));
        if(rect.angle){canvas.rotate(rect.angle);}
        canvas.drawImage(img,Math.round(-.5 * rect.dims[0]), Math.round(-.5 * rect.dims[1]), rect.dims[0], rect.dims[1]);
        canvas.restore();
    };
return canvas;}(elem.getContext("2d")));}(document.getElementById("canvas")));
