function RoomLoader(roomName)
{
    "use strict";
    var pixels = PixelImage(assets.getRoomImage(roomName));
    var turretMetadata = assets.getRoomMetadata(roomName).turretData;

    function getTurretMetadata(x,y)
    {

        var result;
        turretMetadata.forEach(function (data)
        {
            var coords = data[0];

            if (coords[0] === x && coords[1] === y)
                result = data[1];
        });

        if (result)
            return result;
        console.error("There is no turret metadata for "+x+" , " + y);
    }

    room = Room(pixels.width,pixels.height);

    var roomMapping = [
        [[0,0,0],      "Wall"],
        [[127,127,127], "Obstacle"],
        [[0,255,255], "Field"],
        [[255,255,255],"Floor"],
        [[0,0,255],   "Turret"],
        [[0,255,0],   "Start"],
        [[255,0,0],   "End"  ],
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
            var tileName = getTile(pixelColor);


            switch(tileName)
            {
                case "Wall":
                case "Floor":
                    room.addTile(tileName,x,y);
                    break;

                case "Start":
                    room.setStart(x,y);
                    break;

                case "End":
                    room.setEnd(x,y);
                    break;

                case "Turret":

                    var myMetadata = getTurretMetadata(x,y);
                    var turret = Turret([x+.5,y+.5], myMetadata.ai,3,myMetadata.image);
                    room.addTurret(turret);
                    room.addTile("Floor",x,y);
                    break;

                default:
                    console.error("No such tile?");
                    break;
            }
        }
    }

    return room;
}