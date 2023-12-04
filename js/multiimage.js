import SingleImage from "./singleimage.js";

class MultiImage {

    constructor(URLs, canvas) {
        this.URLs = URLs;
        this.canvas = canvas;
        // Create an object of SingleImage elements
        this.images = {};
        for (let key in this.URLs) {
            if (this.URLs.hasOwnProperty(key)) {
                let image = new SingleImage(this.URLs[key]);
                this.images[key] = image;
            }
        }
    }

    loadImage = key => {
        try {
            this.images[key].loadImage();                    
        } catch (error) {
            console.error(`Error loading image ${key}:`, error);
        }
    }

    loadImages = () => {
        for (let key in this.images){
            if(this.images.hasOwnProperty(key)){ 
                try {
                    this.images[key].loadImage();                    
                } catch (error) {
                    console.error(`Error loading image ${key}:`, error);
                }
            }
        }
    }

    showImage = key => {
        this.images[key].showImage(this.canvas);
    }

    segmentImage = key => {
        // get the segment image data
        const segmentedImageData = this.images[key].segmentImage(this.canvas);
        // put the data on an offscreen canvas
        const offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = this.canvas.width;
        offScreenCanvas.height = this.canvas.height;
        const context = offScreenCanvas.getContext('2d');
        context.putImageData(segmentedImageData, 0, 0);
        // get the URL of the data from the canvas
        const URL = offScreenCanvas.toDataURL();
        // add the image to the collection
        this.URLs['segment'] = URL;
        this.images['segment'] = new SingleImage(this.URLs['segment']);
    }
 
    getImageData = key => {
        return this.images[key].getImageData(this.canvas);
    }
}

export default MultiImage;