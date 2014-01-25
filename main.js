var assets;
GameLoader(function(a){
    assets = a;
    var name = 'asdf'
    var room = RoomLoader(name)

    var loop = function(){
        room.update();

        room.draw();
        setTimeOut(loop, 1000/FPS);
    }
    loop()
});
