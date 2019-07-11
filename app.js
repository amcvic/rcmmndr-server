require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/userController');
var profile = require('./controllers/profileController');
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/profile', profile);

app.listen(process.env.PORT, function(){
  console.log(`app is listening on ${process.env.PORT}`);
});