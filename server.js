const express = require('express');
const fs = require('fs');

const JsBarcode = require('jsbarcode');

const app = express();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


app.listen(app.get('port'));
