function GameLoader(callback)
{
    "use strict";

    function load(names,nameTransform,TypeToLoad,readyName,callback)
    {
        var objToLoad = names.length;
        var loaded = {};

        names.forEach(function(item)
        {
            var loadItem = new TypeToLoad();
            loadItem.addEventListener(readyName,function ()
            {
                loaded[item] = loadItem;

                objToLoad -= 1;

                if (objToLoad === 0)
                {
                    callback(loaded);
                }

            },false);

            loadItem.src = nameTransform(item);

        });
    }

    function imageNameTransform(name){
        return "Images/" + name + ".png";
    }

    function soundNameTransform(name)
    {
        return "Sounds/" + name + ".wav";
    }



    var imgNames = ["BlackSquare","BlueSquare"];

    var soundNames = ["test","test2"];

    load(imgNames,imageNameTransform,Image,"load",function(imgLoaded) {
        console.log("The images are now loaded.");
        load(soundNames,soundNameTransform,Audio,"canplaythrough",function (soundLoaded){
            console.log("The sounds are now loaded.");

            var myself = {
                getImage: function(name) { return imgLoaded[name]; }, 
                getSound: function(name) { return soundLoaded[name]; }
            };

            callback(myself);
        });
    });
}