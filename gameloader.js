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

        var soundBuffers = {forward:{},reverse:{}};
        var numberOfSounds = names.length;

        function cloneAudioBuffer(audioBuffer){
    var channels = [],
        numChannels = audioBuffer.numberOfChannels;

    //clone the underlying Float32Arrays
    for (var i = 0; i < numChannels; i++){
        channels[i] = new Float32Array(audioBuffer.getChannelData(i));
    }

    //create the new AudioBuffer (assuming AudioContext variable is in scope)
    var newBuffer = context.createBuffer(
                        audioBuffer.numberOfChannels,
                        audioBuffer.length,
                        audioBuffer.sampleRate
                    );

    //copy the cloned arrays to the new AudioBuffer
    for (var i = 0; i < numChannels; i++){
        newBuffer.getChannelData(i).set(channels[i]);
    }

    return newBuffer;
}

        function loadSound(name) {
            var url = "Sounds/" + name + ".wav";
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function() {
                context.decodeAudioData(request.response, function(buffer) {
                    soundBuffers.forward[name] = buffer;
                    soundBuffers.reverse[name] = cloneAudioBuffer(buffer);

                    for (var i =0 ; i<buffer.numberOfChannels;i++)
                    {
                        Array.prototype.reverse.call( soundBuffers.reverse[name].getChannelData(i) );
                    }
                    
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




    var imgNames = ["Wall","Floor","Start","End","Menu","Player","Bullet","EnemyBullet","LevelSelect","GameOver","GameWon","PlayerDead","Paradox",
    "Turret1","DamagedTurret1","NearDeathTurret1",
    "Turret2","DamagedTurret2","NearDeathTurret2",
    "TimeMachine","SlightlyDamagedTimeMachine","ModeratelyDamagedTimeMachine","HeavilyDamagedTimeMachine","NearDeathTimeMachine","DeadTimeMachine"];

    var roomNames = ["1","2","3"];

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
                        var sound = getOrLogError(name,soundLoaded.forward,"sound");
                        var source = context.createBufferSource(); // creates a sound source
                        source.buffer = sound;                    // tell the source which sound to play
                        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
                        source.start(0);  
                    }

                   

                    function playReversedSound(name)
                    {
                        var sound = getOrLogError(name,soundLoaded.reverse,"sound");
                        var source = context.createBufferSource(); // creates a sound source
                        source.buffer = sound;                    // tell the source which sound to play
                        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
                        source.start(0); 
                    }

                    var myself = {
                        getImage: function(name) {      return getOrLogError(name,imgLoaded,"image"); }, 
                        playSound: function(name,backward) { if (backward) playReversedSound(name); else playSound(name);},
                        getRoomImage: function (name) { return getOrLogError(name,roomLoaded,"room"); },
                        getRoomMetadata: function(name){return getOrLogError(name,roomMetaDataLoaded,"room metadata");}
                    };

                    callback(myself);
                });
            });
        });
    });
}