const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Herb    = require ('../models/Herb');
const mongoose     = require('mongoose');
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


//Creating a route to check if username exist
router.post('/signup/username', (req,res)=> {

  User.findOne({username: req.body.username})
    .then((user)=> {
      if(user){
        res.status(409).json({message: "username taken"});
      } else {
        res.status(200).json({message: "username available"});
      }
    })
    .catch((error)=>{
      next(new Error(error))
    })
})

// POSTING the user data to the MongoDB
router.post('/signup', (req, res, next) => {

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    let newUser = {
      username: req.body.username,
      password: hash
    };
    // Checking if username exists  
    User.findOne({username: req.body.username})
      .then((user)=> {
        if(user){
          next(new Error("Username already taken."));
        } else {
          User.create(newUser)
          .then(()=> {
            res.redirect('login');
          })
        }
      })
  })
});

// Login for users
router.get('/login', (req, res, next) => {
      res.render('login');
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
          res.redirect('profile');
          // Changing the url to match the render

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
  if(req.session.user) {
    res.render("favorites");
  } else {
    res.redirect("login");
  }
});

// Getting profile page
router.get("/profile", (req,res)=> {
  if(req.session.user) {
    res.render("profile");
  } else {
    res.redirect("login");
  }
})

// create a herb redirecting
router.get("/create", (req,res)=> {
  if(req.session.user) {
    res.render("create-herb");
  } else {
    res.redirect("login");
  }
})

// save created herb in the database
router.post('/create', (req, res, next) => {
  if(req.session.user) {
    let newHerb = new Herb ({
      commonName: req.body.commonName,
      latinName: req.body.latinName,
      image: req.body.imageUrl,
      description: req.body.description,
      waterNeed: req.body.waterNeed,
      lightNeed: req.body.lightNeed,
      temperature: {
        min: req.body.temperatureMin,
        max: req.body.temperatureMax,
        optimal: req.body.temperatureOptimal
      },
      season: {
        start: req.body.seasonStart,
        end: req.body.seasonEnd,
      },
      inside: req.body.inside === "on",
      creator: mongoose.Types.ObjectId(req.session.user._id)
      // created: {
      //   type: Date,
      //   default: Date.now
      // }
    })
    newHerb.save()
    .then(() => {
      res.redirect("/myherbs");
    })
    .catch((err) => {
      res.send("ERROOOROROROR" + err)
    })
  } else {
    res.redirect("login");
  }
  
  
});

// find all herbs the user created
router.get('/myherbs', (req, res, next) => {
  Herb.find({creator: mongoose.Types.ObjectId(req.session.user._id)})
  .then((herbs) => {
    res.render('my-herbs', {herbs});
  })
  .catch((err) => {
    res.send("Error in myherbs route");
  })
});

// Logging out
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;