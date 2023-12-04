import MultiImage from "./multiimage.js";

let canvas1 = document.getElementById('input');

let canvas2 = document.getElementById('output');

let URLs = {
    'visible': './cassiopeia.jpg',
    'xray': './cassiopeia_big.jpg' //used the same image but with a bigger size to test resizing
}

let multiimage1 = new MultiImage(URLs, canvas1);
multiimage1.loadImages();
multiimage1.showImage('xray');

let multiimage2 = new MultiImage(URLs, canvas2);
multiimage2.loadImages();
multiimage2.segmentImage('visible');
multiimage2.loadImage('segment');
multiimage2.showImage('segment');
