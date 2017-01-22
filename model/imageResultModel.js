var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
var imageResultSchema = new Schema({
  searchTerm: String,
  timeSearched: { type: Date, default: Date.now },
});

var imageResults = mongoose.model('imageResults', imageResultSchema);

module.exports = imageResults;