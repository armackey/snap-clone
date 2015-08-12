var userCtrl = require('../controllers/user.ctrl');
var app = module.parent.exports.app;

app.get('/users', userCtrl.getUsers);
app.get('/users/:user_id', userCtrl.oneUser);
app.post('/signin', userCtrl.signIn);
app.post('/login', userCtrl.login);
