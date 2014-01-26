"use strict";
var assets;
var room;
function Main(levelName)
{
    room = RoomLoader(levelName);

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    var loop = function(){
        room.update();

        if (room.isGameLost())
        {
            GameOver(function(){
                Menu(Main);
            });  
        }
        else if (room.isGameWon())
        {
            GameWon(function(){
                Menu(Main);
            });
            
        }
        else
            setTimeout(loop, 1000/FPS);
    };

    var renderLoop = function(){

        if (!room.isGameOver())
        {
            room.draw();
            window.requestAnimationFrame(renderLoop)

        }
            
    }

    loop();
    renderLoop();

}

GameLoader(function(a){
    assets = a;
    Menu(Main);
});
