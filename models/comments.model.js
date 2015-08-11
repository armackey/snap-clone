var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  date: { type: Date, default: Date.now },
  username: { type: String, index: { unique: true } },
  comment:{type: String}
});




module.exports = mongoose.model('Comment', CommentSchema);