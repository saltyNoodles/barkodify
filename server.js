const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

const imageHandler = require('./image-handler.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const exampleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVklEQVQoz2NkYGBgCA0N5VRWVcz5/5/R5Ou3r7umTJwyl4GBgSEnLzODm4fXkZGB6dTF8xenbN++/SdLaGioqJa25gl7O3slbW0dhqPHjgby8/Ja/v33j9nC0jLa0tyS9fKlS2Ec7GzpPDw8FgyNzQ0rLl2+9B8ZXLp88cvVq1c+I4udO3/uf3NL4yImVjY2dV0dXQZkoKujx62lpc2DLGZoYMjAyMSky/Tx/Qfmjx8/MBACr9+8Zvj69csfpp+/fmx4+vTZH0IaHj95/PPLl2+rGBgYGBgKCvNPf/z48T8ucP/+/b/FJQU74LpDQ0OZa2qrTmFT/Pjx4z9NzQ1bMax0cHBgyczJuPr////fMMVfvnz5UVxSuBunO0NDQ9mysjOv/P////+zZ0//5RfkHUZXw4gu4Onpya6moXqNiZHxV3/fRE10eRZ0ge3bt/+UlZXVwOUKAHly1BHChJ2BAAAAAElFTkSuQmCC';


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

    res.status(201).send('Image created as ' + file);
  })
});

app.listen(app.get('port'));
