var assets;
var room;
GameLoader(function(a){
    assets = a;
    Menu(function() {
        var name = "1";
        room = RoomLoader(name);

        var loop = function(){
            room.update();

            room.draw();
            setTimeOut(loop, 1000/FPS);
        };
        loop();
    });

});
