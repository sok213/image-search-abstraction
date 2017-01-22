const express   = require('express'),
  mongoose      = require('mongoose'),
  app           = express(), 
  url           = require('url'),
  config        = require('./config'),
  apiController = require('./controllers/apiController'),
  port          = process.env.PORT || 3000;

// Connect to my mLab database.
mongoose.connect(config.mlabURI());

const db = mongoose.connection;

// Errer and success handler.
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
  console.log('connected');
});

// Serve app to apiController module which will listen to any 
// request on /api/search/:term
apiController(app);

// Initiate express app.
app.listen(port);