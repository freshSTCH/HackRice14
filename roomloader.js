function RoomLoader(roomName,assets)
{
    "use strict";
    var pixels = new PixelImage(assets.getRoom(roomName));

    var room = new Room(pixels.width,pixels.height);

    var roomMapping = new Map([
        [[0,0,0],"Foo"],
        [[255,255,255],"Blah"],
    ]);

    function getTile(){
        
    }

    for (var x = 0; x < pixels.width; x++)
    {
        for (var y = 0; y < pixels.height; y++)
        {
            var pixelColor = pixels.getColor(x,y);


        }
    }
}