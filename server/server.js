var express = require('express');
var app = express();
var api = require('./api/api');
var util = require('./api/auth/util');
var config = require('./config/config');
var User = require('./api/user/userModel');
// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);
// serves client code
app.use('/', express.static(__dirname + '/../client/new_layout'));

// setup the app middlware
require('./middleware/appMiddlware')(app);


app.post('/login',function(req, res) {
  console.log(req.body)


  User.findOne(req.body)
    .exec(function(err, user) {
      console.log(user)
      if (!user) {
        res.status(404).send('user not found')
      } else {
        res.send(user);
        // util.createSession(req, res, user);
      }
  });
});


// setup the api, including all routes
app.use('/api/', api);

// set up global error handling

// export the app for testing
module.exports = app;
