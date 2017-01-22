var configValues = require('./config');

// Export mlabURI and apiKey functions that will return a string value 
// to be used in placement for the API HTTP GET request.
module.exports = {
  mlabURI: function() {
    return `mongodb://${ configValues.username }:${ configValues.pwd }` + 
    `@ds019926.mlab.com:19926/image-search-abstraction`;
  },
  apiKEY: function() {
    return configValues.apiKEY;
  }
};