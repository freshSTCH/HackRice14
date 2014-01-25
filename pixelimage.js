function PixelImage(image)
{
    var internalCanvas = document.createElement("canvas");
    internalCanvas.width = image.width;
    internalCanvas.height = image.height;

    var context = internalCanvas.getContext("2d");

    context.drawImage(image,0,0,image.width,image.height);

    var myself = {
        getColor: function(x,y) {return context.getImageData(x,y,1,1);}
    };

    return myself;
}