const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs')

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

// Check if /public/memes directory exists
if(!fs.existsSync('./public/memes')) {
  fs.mkdirSync('./public/memes')
}

app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));
app.use('/public', express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PORT || 9145);
} else {
  var pem = require('pem');
  var https = require('https');
  pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
    if (err) throw err;

    https.createServer({
      key: keys.serviceKey,
      cert: keys.certificate
    }, app).listen(process.env.PORT || 9145);
  });
}