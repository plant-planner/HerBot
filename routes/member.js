const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
var bcrypt    = require('bcrypt');

// Creating a user
router.get('/signup', (req, res, next) => {
  User.find({})
  .then((user)=> {
    res.render('signup', {user});
  })
  
  .catch((error)=>{
    next();
  })
});

// POSTING the user data to the MongoDB
router.post('/signup', (req, res, next) => {

  bcrypt.hash(req.body.password, 10, function(err, hash) {
      
    let newUser = {
      username: req.body.username,
      password: hash
    };

  User.create(newUser)
    .then(()=> {
      res.redirect('login') ;
      if (res.redirect) {
        document.location.href = res.redirect; 
      }
    })

    .catch((error)=> {
      next();
    })
})

});

// Login for users
router.get('/login', (req, res, next) => {
    User.find({})
    .then(()=> {
      res.render('login');
    })
    
    .catch((error)=> {
      next();
    })
});

// POSTING user data when logging in
router.post('/login', (req, res, next) => {
  //Finding the user so we can compare hashed password
  User.findOne({username: req.body.username})
  .then((user)=> {
    // Comparing passwords
    if(user) {
      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if(err) throw new Error("Something is wrong with the encryption");
        if(match) {
          req.session.user = user;
          // Redirecting to profilepage
          res.render('profile');

        } else {
          // Password is not correct
          res.send("Invalid Password")
        }
      });
    } else {
      //User is not found
      res.send("Invalid username");
    }
  })

  .catch((error)=> {
    next();
  })
});

// Listing userfavorites
router.get('/favorites', (req, res, next) => {
  res.render('favorites');
});

// Getting profile page
router.get("/profile", (req,res)=> {
  if(req.session.user) {
    res.send(`Welcome to your profile page ${req.session.user.username}`)
  } else {
    res.render("profile")
  }
})

// Logging out
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;