const config  = require('../config'),
  searchQuery = require('../model/imageResultModel'),
  request     = require('request');

module.exports = app => {
  app.get('/api/search/:term', (req, res) => {
    // API request to get search term data from pixabay.
    request(`https://pixabay.com/api/?key=${ config.apiKEY() }` + 
      `&q=${ req.params.term }&pretty=true&per_page=10`, 
      // Callback function for HTTP request.
      (err, response, data) => {
        // If no error, send JSON data as an HTTP reponse.
        if (!err && response.statusCode == 200) {
          console.log(`Search for ${ req.params.term } was successful!`);
          
          // Format object to be sent as a response.
          let searchResults = {
            totalHits: JSON.parse(data).totalHits,
            hits: [],
            total: JSON.parse(data).total
          };
          
          // Create newSearch object with values retrieved from URL parameter
          let newSearch = searchQuery({
            url: req.params.term,
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
};