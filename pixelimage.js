function PixelImage(image)
{
    "use strict";

    var internalCanvas = document.createElement("canvas");
    internalCanvas.width = image.width;
    internalCanvas.height = image.height;

    var context = internalCanvas.getContext("2d");

    context.drawImage(image,0,0,image.width,image.height);

    var myself = {
        getColor: function(x,y) {

            var imageData = context.getImageData(x,y,1,1).data;
            console.log(imageData);
            return {
                r : imageData[0],
                g : imageData[1],
                b : imageData[2]
            };
        },
        width: image.width,
        height: image.height
    };

    return myself;
}