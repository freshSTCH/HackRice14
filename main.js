GameLoader(function(assets){
    var name = 'asdf'
    var room = RoomLoader(name, assests)

    var loop = function(){
        room.update();

        room.draw();
        setTimeOut(loop, 1000/FPS);
    }
    loop()
};
