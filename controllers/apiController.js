const config  = require('../config'),
  mongoose    = require('mongoose'),
  searchQuery = require('../model/imageResultModel'),
  request     = require('request');

module.exports = app => {
  app.get('/api/search/:term', (req, res) => {
    
    // Set default offset for pagination to 1.
    let offset = 1;
    
    // If optional offset parameter is provided, store it to offset variable.
    if(req.query.offset) {
      offset = req.query.offset;
    }
    // API request to get search term data from pixabay.
    request(`https://pixabay.com/api/?key=${ config.apiKEY() }` + 
      `&q=${ req.params.term }&pretty=true&per_page=10&page=${ offset }`, 
      // Callback function for HTTP request.
      (err, response, data) => {
        // If no error, send JSON data as an HTTP reponse.
        if (!err && response.statusCode == 200) {
          
          // Debugging logs.
          console.log(`Search for ${ req.params.term } was successful!`);
          console.log(`Setting offset to ${ req.query.offset }`);
          
          // Format object to be sent as a response.
          let searchResults = {
            totalHits: JSON.parse(data).totalHits,
            hits: [],
            total: JSON.parse(data).total
          };
          
          // Create newSearch object with values retrieved from URL parameter
          let newSearch = searchQuery({
            searchTerm: req.params.term,
            timeSearched: new Date().toISOString()
          });
          
          // Format and push all results into searchResults object.
          JSON.parse(data).hits.forEach(hit => {
            searchResults.hits.push(
              {
                url: hit.webformatURL, 
                tag: hit.tags,
                pageURL: hit.pageURL
              }
            );
          });
          
          // Save object to database and send JSON data as response to client.
          newSearch.save();
          res.send(searchResults);
        }
      }
    );
  });
  
  // When client connects to /api/latest, app will respond with
  // the last 10 search terms pulled from mLab.
  app.get('/api/latest', (req, res) => {
    // Find last 10 results and send it as an HTTP response.
    let options = {
      "limit": 5,
      "sort": { timeSearched: -1 }
    };
    
    searchQuery.find({}, {}, options, function(err, result){
      res.send(result);
    });
  });
};
