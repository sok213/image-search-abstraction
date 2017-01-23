const express   = require('express'),
  mongoose      = require('mongoose'),
  app           = express(), 
  url           = require('url'),
  config        = require('./config'),
  apiController = require('./controllers/apiController'),
  path          = require('path'),
  port          = process.env.PORT || 3000;

// Connect to my mLab database.
mongoose.connect(config.mlabURI());

// Serve app to apiController module which will listen to any 
// request on /api/search/:term
apiController(app);

// Pipe the asset folder.
app.use('/', express.static('assets'));

// Handle non-existent pages by sending in 404.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/404.html'));
});

// Initiate express app.
app.listen(port);