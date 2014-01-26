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

        if (room.isPlayerDead())
        {
            PlayerDead(function(){
                Menu(Main);
            });  
        }
        else if (room.isParadox())
        {
            Paradox(function(){
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


        if (!room.isParadox() && !room.isPlayerDead())
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
