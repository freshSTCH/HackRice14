function LevelSelect(callback)
{
    "use strict";
    //really convert to square, but whatev
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
    GetJSON("Data/levelselect.json",function(buttons)
    {
        convertToRect(buttons);

        var levelSelectImage = assets.getImage("LevelSelect");
        canvas.drawImage(levelSelectImage,0,0,WIDTH,HEIGHT);

        var id = canvas.addMouseDownListener(function(pos)
        {
            var buttonPressed = getButtonPressed(buttons,pos);
            console.log(buttonPressed);
            if(buttonPressed)
            {
                switch(buttonPressed)
                {
                    case "level1":
                        canvas.removeMouseDownListener(id);
                        callback();
                        break; 
                    
                    case "level2":
                        canvas.removeMouseDownListener(id);
                        callback();
                        break; 

                     case "level3":
                        canvas.removeMouseDownListener(id);
                        callback();
                        break; 
                     case "level4":
                        canvas.removeMouseDownListener(id);
                        callback();
                        break;
                   

                     //levels 5 and 6 not implemented
                     /*case "level5"
                        canvas.removeMouseDownListener(id);
                        callback();
                        break;     
                     case "level6"
                        canvas.removeMouseDownListener(id);
                        callback();
                        break; 


                    For the json:
                    "level5":[[240, 210][390,85]]
                    "level6":[[450, 210][575,85]]
                    */
                              
                    default:
                        console.error("A non existant button ",buttonPressed);
                        break;
                }
            }
        });


    });
}

