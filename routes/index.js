var app = module.parent.exports.app;
var userCtrl = require('../controllers/user.ctrl');

app.get('/users', userCtrl.getUsers);
app.post('/signin', userCtrl.signIn);
app.post('/login', userCtrl.login);
app.get('/comments', userCtrl.getComments);
app.post('/comments', userCtrl.postComments);