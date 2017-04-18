var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var path = require('path');

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));
app.use('/static', express.static(path.join(__dirname, 'public')));

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