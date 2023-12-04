
class SingleImage {

    constructor(URL) {
        this.URL = URL; 
        this.image = new Image();
    }

    loadImage = () => {
        this.image.src = this.URL;
    }

     showImage = canvas => {
        this.image.onload = () => {
            let context = canvas.getContext("2d");
            context.drawImage(this.image, 0, 0, canvas.width, canvas.height); //image also gets resized
        }
    }

    segmentImage = canvas => {
        // Create an offscreen canvas to get the image data
        const offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = canvas.width;
        offScreenCanvas.height = canvas.height;
        this.showImage(offScreenCanvas);
        const offScreenContext = offScreenCanvas.getContext('2d');
        let imageData = offScreenContext.getImageData(0, 0, canvas.width, canvas.height);
        console.log(imageData); // for some reason, this outputs the image data of the 
        //segmented image, not the original image, if you know why this is let me know

        //Fake segmentation
        // Create blue background 
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 0;     
            imageData.data[i + 1] = 0;                 
            imageData.data[i + 2] = 255; 
            imageData.data[i + 3] = 255;
        }
        // Create a red square in the middle
        const squareSize = 100; 
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
    
        for (let y = centerY - squareSize / 2; y < centerY + squareSize / 2; y++) {
            for (let x = centerX - squareSize / 2; x < centerX + squareSize / 2; x++) {
                const index = (y * canvas.width + x) * 4;
                imageData.data[index] = 255;     
                imageData.data[index + 1] = 0;   
                imageData.data[index + 2] = 0;   
                imageData.data[index + 3] = 255; 
            }
        }
        return imageData; 
    }

    getImageData = canvas => {
        return this.segmentImage(canvas);
    }
}

export default SingleImage;