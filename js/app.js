var c = document.getElementById("input");
var ctx = c.getContext("2d");
var ce = document.getElementById("output");
var ctxEdited = ce.getContext("2d");

    const img = new Image();        
    img.src = './cassiopeia.jpg';         
    img.onload = () => { 
      ctx.drawImage(img, 0, 0);
      ctxEdited.drawImage(img, 0, 0);
      const ctxData = ctxEdited.getImageData(0, 0, c.width, c.height);
      segment(ctxData);
    };

const segment = imagePath => {
  const Jimp = require('jimp');
const Watershed = require('./watershed.js'); // Assuming you have Watershed.js in the same directory

const w = new Watershed();

Jimp.read(imagePath)
  .then(image => {
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const pixels = new Array(width * height);

    // Get pixel values
    image.scan(0, 0, width, height, (x, y, idx) => {
      pixels[y * width + x] = Jimp.intToRGBA(image.getPixelColor(x, y));
    });

    // Convert pixel data to 2D array
    const imageData = new Array(height).fill(0).map(() => new Array(width).fill(0));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        imageData[y][x] = [
          pixels[y * width + x].r,
          pixels[y * width + x].g,
          pixels[y * width + x].b,
        ];
      }
    }

    const labels = w.apply(imageData);
    // Assuming you have a method to display the segmented image
    displayImage(labels, width, height);
  })
  .catch(err => {
    console.error(err);
  });

}

const displayImage = (labels, width, height) => {

}
