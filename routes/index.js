const express = require('express');
const router  = express.Router();
const Herb    = require ('../models/Herb');
const User    = require ('../models/User');
const mongoose = require("mongoose");
/* GET home page */
router.get('/', (req, res, next) => {

  Herb.find({})
  .then((herbs) => {
    res.render('index', {herbs});
  })
  .catch((err) => {
    res.send("Error in index route");
  })
});

/* GET Single Herb Detail */
router.get('/herb/:id', (req, res, next) => {
  Herb.findById(req.params.id)
  // .populate("creator")
  .then((herb) => {
    res.render("herb", {herb});
  })
  .catch((err) => {
    res.send("Error in herb-detail route")
  })
});

// A route for storing favorites
router.post('/herb/favorites/:id', (req,res, next)=> {
  User.findByIdAndUpdate(req.session.user._id, {$push: {favorites: mongoose.Types.ObjectId(req.params.id)}})
      .then((user)=> {
          res.redirect(`/`)
      })
      .catch((error)=> {
          next()
      })

})


module.exports = router;
