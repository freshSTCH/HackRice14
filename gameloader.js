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

    function roomNameTransform(name) {
        return "Rooms/" + name + ".png";
    }



    var imgNames = ["Wall","Floor","Start","End","Turret","Menu"];
    var roomNames = ["1"];

    var soundNames = ["test","test2"];

    load(imgNames,imageNameTransform,Image,"load",function(imgLoaded) {
        console.log("The images are now loaded.");

        load(soundNames,soundNameTransform,Audio,"canplaythrough",function (soundLoaded){
            console.log("The sounds are now loaded.");

            load(roomNames,roomNameTransform,Image,"load",function(roomLoaded) {
                console.log("The rooms are now loaded.");

                function getOrLogError(name,obj,title)
                {
                    if (name in obj)
                        return obj[name];
                    console.error("There is no "+name+" "+title);
                }

                var myself = {
                    getImage: function(name) {      return getOrLogError(name,imgLoaded,"image"); }, 
                    getSound: function(name) {      return getOrLogError(name,soundLoaded,"sound"); },
                    getRoomImage: function (name) { return getOrLogError(name,roomLoaded,"room"); }
                };

                callback(myself);
            });
        });
    });
}