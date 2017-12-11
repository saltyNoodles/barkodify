const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

const imageHandler = require('./image-handler.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.set('port', (process.env.PORT || 3001));

app.use('/user-img/', express.static('images/barcodes/'));

app.post('/save/', (req, res) => {
  let { imageDataURI } = req.body;
  console.log(imageDataURI, '<- imageDataURI');
  imageHandler.saveImage(imageDataURI, (error, file) => {
    if (error) {
      return res.status(400).send('error saving file:' + error);
    }

    res.status(201).send({filename: file, url: '/user-img/' + file});
  })
});

app.listen(app.get('port'), () => console.log('listening on port', app.get('port')));
