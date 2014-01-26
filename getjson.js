function GetJSON(url,callback)
{
    "use strict";
    var request = new XMLHttpRequest();

    request.open("GET",url,true);

    request.onload = function(){
        var json = JSON.parse(request.responseText);

        callback(json);
    };

    request.send();
}