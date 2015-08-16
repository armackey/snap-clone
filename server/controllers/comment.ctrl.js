var Comments = require('../models/comment.model');

// finds all coments
exports.getComments = function (req, res) {
  Comments.find({}, function(err, comments){
    if(err) throw err;
    res.send(comments);
  });
};
// post a comment
exports.postComments = function (req, res) {
  var newComment = new Comments({
    date: req.body.date,
    username: req.body.username,
    comment: req.body.comment
  });
  newComment.save(function(){
    console.log(req.body);
    res.send(newComment);
  });
};
