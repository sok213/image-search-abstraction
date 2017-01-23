const mongoose = require('mongoose'),
  Schema       = mongoose.Schema;

// Define Schema.
const imageResultSchema = new Schema({
  searchTerm: String,
  timeSearched: { type: Date, default: Date.now },
});

// Sets the new Schema as a mongoose model.
const imageResults = mongoose.model('imageResults', imageResultSchema);

// Export the mongoose Schema.
module.exports = imageResults;