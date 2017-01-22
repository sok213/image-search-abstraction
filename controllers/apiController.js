const config  = require('../config'),
  searchQuery = require('../model/imageResultModel'),
  request     = require('request');
  
function searchObj(url, tags, pageURL) {
  this.url     = url;
  this.tags    = tags;
  this.pageURL = pageURL;
}

module.exports = function(app) {
  app.get('/api/search/:term', function(req, res) {
    // API request to get search term data from pixabay.
    request(`https://pixabay.com/api/?key=${ config.apiKEY() }` + 
      `&q=${ req.params.term }&pretty=true&per_page=3`, 
      // Callback function for HTTP request.
      function(err, response, data) {
        // If no error, send JSON data as an HTTP reponse.
        if (!err && response.statusCode == 200) {
          console.log(`Search for ${ req.params.term } was successful!`);
          
          // Create newSearch object with values retrieved from URL parameter
          var newSearch = searchQuery({
            url: req.params.term,
            timeSearched: new Date().toISOString()
          });
          console.log("Length: " + data.length);
          
          // Save object to database and send JSON data as response to client.
          newSearch.save();
          res.send(data);
        }
      }
    );
  });
};