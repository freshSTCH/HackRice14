function Menu(callback)
{
    var menuImage = assets.getImage("Menu")
    canvas.drawImage(menuImage,0,0,WIDTH,HEIGHT);

    canvas.addMouseDownListener(function(pos)
    {
        console.log("Down at ",pos);
    });

}