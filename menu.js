function Menu(callback)
{
    "use strict";

    function convertToRect(objData)
    {
        for (var key in objData)
        {
            objData[key] = Rect(objData[key][0],objData[key][1]);
        }
    }

    function getButtonPressed(buttons,pos)
    {
        for (var key in buttons)
        {
            if (buttons[key].intersectsPoint(pos))
                return key;
        }
    }

    GetJSON("Data/menu.json",function(buttons)
    {
        convertToRect(buttons);

        var menuImage = assets.getImage("Menu");
        canvas.drawImage(menuImage,0,0,WIDTH,HEIGHT);

        var id = canvas.addMouseDownListener(function(pos)
        {
            var buttonPressed = getButtonPressed(buttons,pos);
            console.log(pos,buttonPressed);
            if(buttonPressed)
            {
                console.log("beartrap0")
                switch(buttonPressed)
                {
                    case "playButton":
                        assets.getSound("test").play();
                        canvas.removeMouseDownListener(id);
                        callback();
                        break; 

                    case "levelButton":
                        console.log("beartrap3")
                        assets.getSound("test").play();
                        console.log("beartrap4")

                        canvas.removeMouseDownListener(id);
                        LevelSelect(callback);
                        break;

                    default:
                        console.error("A non existant button ",buttonPressed);
                        break;
                }
            }
        });


    });

}