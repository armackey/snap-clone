var commentCtrl = require('../controllers/comment.ctrl');
// import our app object
var app = module.parent.exports.app;

app.get('/comments', commentCtrl.getComments);
app.post('/comments', commentCtrl.postComments);



