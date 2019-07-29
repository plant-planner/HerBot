const express = require('express');
const router  = express.Router();
const User = require('../models/user');

// Creating a user
router.get('/signup', (req, res, next) => {
  User.find({})
  .then((user)=>{
    debugger
    res.render('signup', {user});
  })

  .catch((error)=>{
    next();
  })
});

// POSTING the user data to the MongoDB
router.post('/signup'), (req, res, next) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password
  };

  User.create(newUser)
    .then((user)=>{
      debugger
      res.render('login');
    })

    .catch((error)=>{
      next();
    })

}

// Login for users
router.get('/login', (req, res, next) => {
  User.find({})
  .then((user)=> {
    res.render('login');
  })

  .catch((error)=> {
    next();
  })

});


// Listing userfavorites
router.get('/favorites', (req, res, next) => {
  res.render('favorites');
});

// Showing userprofiles

router.get('/profile', (req, res, next) => {
  res.render('profile');
});


module.exports = router;