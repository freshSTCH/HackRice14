function GameLoader(callback)
{
    "use strict";


    function loadImages(imgNames,callback)
    {
        var imgsToLoad = imgNames.size;
        var loadedImages = {}

        imgNames.forEach(function(item)
        {
            var imgObject = new Image()
            imgObject.addEventListener("load",function () 
            {

                loadedImages[item] = imgObject;

                imgsToLoad -= 1;

                if (imgsToLoad === 0)
                {
                    callback(loadedImages);
                }
            },false);

            imgObject.src = item + '.png';

        });
    }

    var imgNames = ["foo","blah"];
    loadImages(imgNames,function(loaded) {
        console.log(loaded);
    });
    
}