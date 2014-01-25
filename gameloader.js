function GameLoader(callback)
{
    "use strict";


    function loadImages(imgNames,callback)
    {
        var imgsToLoad = imgNames.length;
        var loadedImages = {};

        imgNames.forEach(function(item)
        {
            var imgObject = new Image();
            imgObject.addEventListener("load",function ()
            {
                loadedImages[item] = imgObject;

                imgsToLoad -= 1;

                if (imgsToLoad === 0)
                {
                    callback(loadedImages);
                }

            },false);

            imgObject.src = "Images/" + item + ".png";

        });
    }

    var imgNames = ["BlackSquare","BlueSquare"];
    loadImages(imgNames,function(imgObject) {
        console.log("The images are now loaded ",loaded);

        var myself = {
            getImage: function(name) { return imgObject[name]; }

        }

        callback(myself);

    });


}