function GameWon(callback)
{
    var menuImage = assets.getImage("GameWon");
    canvas.drawImage(menuImage,0,0,WIDTH,HEIGHT);

    var id = canvas.addMouseDownListener(function(pos)
    {
        canvas.removeMouseDownListener(id);
        callback();
    });
}