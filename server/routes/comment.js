var commentCtrl = require('../controllers/comment.ctrl');
var app = module.parent.exports.app;


app.get('/comments', commentCtrl.getComments);
app.post('/comments', commentCtrl.postComments);