function RoomLoader(roomName,assets)
{
    "use strict";
    var pixels = PixelImage(assets.getRoomImage(roomName));

    //var room = Room(pixels.width,pixels.height);

    var roomMapping = [
        [[0,0,0],      "Wall"],
        [[255,255,255],"Floor"],
    ];

    function getTile(color){
        var result;
        roomMapping.forEach(function(tileInfo)
        {
            var tileColor = tileInfo[0];
            if ((color.r === tileColor[0]) && (color.g === tileColor[1]) && (color.b === tileColor[2]))
            {
                result = tileInfo[1];
            }


        });

        if (result)
            return result;

        console.error("No such color for ",color);
    }

    for (var x = 0; x < pixels.width; x++)
    {
        for (var y = 0; y < pixels.height; y++)
        {
            var pixelColor = pixels.getColor(x,y);
            var tile = getTile(pixelColor);

            console.log(tile);

        }
    }
}