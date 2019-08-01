require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const app          = express();

// Setting upp Sessions for user
const session = require('express-session')

app.use(session({
  secret: 'was geht',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path    : '/',
    httpOnly: false,
  }
}))

// Register Partials Folder
hbs.registerPartials(__dirname + '/views/partials');

// used to set html-select elements according to a database value
hbs.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value && conditional && options.hash.value.toString() === conditional.toString()) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});

// Connecting to database
mongoose.connect(process.env.MONGO_PASS, {useNewUrlParser: true, useFindAndModify: false})
  .then(x => {
    console.log(`Connected to Mongo Database`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// defining custom route protection middleware
let protectRoute = function(req, res, next) {
  if(req.session.user) next();
  else res.redirect("/member/login")
}

// attaching session data to all hbs files
app.use(function(req,res,next) {
  if(req.session.user) res.locals.user = req.session.user;
  next();
})

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'HerbDB';
app.locals.host = process.env.HOST;
app.locals.port = process.env.PORT;
// Adding Routes
app.use('/', require('./routes/index'));
app.use('/member', require('./routes/member'));
app.use('/search', require('./routes/search'));

app.use(function(req,res, next){
  res.send("There was an error")
})

module.exports = app;
