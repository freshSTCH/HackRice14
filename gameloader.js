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

    function loadMetadataForRooms(names,callback) {

        var numberOfNames = names.length;

        var metadataMap = {};

        names.forEach(function (name)
        {
            var url = "Rooms/" + name + ".json";

            GetJSON(url,function(data)
            {
                metadataMap[name] = data;
                numberOfNames -= 1;

                if (numberOfNames === 0)
                {
                    callback(metadataMap);
                }

            });
        });
    }


    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var context = new window.AudioContext();

    function loadSounds(names,callback)
    {

        var soundBuffers = {};
        var numberOfSounds = names.length;

        function loadSound(name) {
            var url = "Sounds/" + name + ".wav";
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function() {
                context.decodeAudioData(request.response, function(buffer) {
                    soundBuffers[name] = buffer;
                    numberOfSounds-=1;

                    if (numberOfSounds === 0)
                    {
                        callback(soundBuffers);
                    }

                });
            };
            request.send();
        }

        names.forEach(loadSound);
    }



    var imgNames = ["Wall","Floor","Start","End","Turret","Menu","Player","Bullet","EnemyBullet","LevelSelect","TimeMachine","Turret2"];
    var roomNames = ["1"];

    var soundNames = ["Shoot","PlayerTakingDamage", "TimeMachineTakingDamage", "TurretDeath", "TimeMachineTakingDamage", "TimeTurningBack", "TimeTurningBackalt", "TimeMachineRightBeforeExplosion"];

    load(imgNames,imageNameTransform,Image,"load",function(imgLoaded) {
        console.log("The images are now loaded.");

        loadSounds(soundNames,function (soundLoaded){
            console.log("The sounds are now loaded.");

            load(roomNames,roomNameTransform,Image,"load",function(roomLoaded) {
                console.log("The rooms are now loaded.");

                loadMetadataForRooms(roomNames,function (roomMetaDataLoaded){
                    function getOrLogError(name,obj,title)
                    {
                        if (name in obj)
                            return obj[name];
                        console.error("There is no "+name+" "+title);
                    }

                    function playSound(name)
                    {
                        var sound = getOrLogError(name,soundLoaded,"sound");
                        var source = context.createBufferSource(); // creates a sound source
                        source.buffer = sound;                    // tell the source which sound to play
                        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
                        source.start(0);  
                    }

                    var myself = {
                        getImage: function(name) {      return getOrLogError(name,imgLoaded,"image"); }, 
                        playSound: function(name) {      playSound(name); },
                        getRoomImage: function (name) { return getOrLogError(name,roomLoaded,"room"); },
                        getRoomMetadata: function(name){return getOrLogError(name,roomMetaDataLoaded,"room metadata");}
                    };

                    callback(myself);
                });
            });
        });
    });
}