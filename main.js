"use strict";
var assets;
var room;
function Main(levelName)
{
    room = RoomLoader(levelName);

    var loop = function(){
        room.update();
        room.draw();

        if (!room.isGameOver())
            setTimeout(loop, 1000/FPS);
        else
        {
            GameOver(function(){
                Menu(Main);
            });
        }
    };

    loop();

}

GameLoader(function(a){
    assets = a;
    Menu(Main);
});
