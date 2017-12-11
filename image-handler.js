const fs = require('fs');
const imageDataURI = require('image-data-uri');

const imageHandler = {}

imageHandler.dir = './images/barcodes/';

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const generateFilename = (timesRun = 0, base='barcode') => {
  timesRun++;
  let filename = `${base}-${randomInteger(1, 100000)}-${Date.now()}.bc.png`;

  // check if file exists
  if(fileExists(imageHandler.dir + filename)) {
    if (timesRun >= 10) {
      // The chances of this happening are incredibly slim, but I may as well account for it. 
      return generateFilename(0, base=base + '-1');
    }
    return generateFilename(timesRun);
  } else {
    return filename;
  }
}

const fileExists = filePath => {
  fs.stat(filePath, (err) => {
    if(err) {
      return false;
    } else {
      return true;
    }
  });
}

imageHandler.saveImage = (dataURI, callback)=> {
  const filename = generateFilename();
  imageDataURI.outputFile(dataURI, imageHandler.dir + filename)
    .then(() => {
      console.log('saved file:', filename);
      callback(null, filename);
    })
    .catch (e => {
      console.log('ERROR:', e);
      return callback(e);
    });
};


module.exports = imageHandler;