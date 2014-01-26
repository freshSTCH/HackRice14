function Menu(callback)
{
    GetJSON("Data/menu.json",function(data)
    {

        var startRect = Rect(data.playButton[0],data.playButton[1]);

        var menuImage = assets.getImage("Menu")
        canvas.drawImage(menuImage,0,0,WIDTH,HEIGHT);

        canvas.addMouseDownListener(function(pos)
        {
            console.log("Down at ",pos);

            if (startRect.intersectsPoint(pos))
            {
                console.log("WIN!!");
                callback();
            }
        });
    });

}