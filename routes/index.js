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
  console.log(req.session.user)
  User.findByIdAndUpdate(req.session.user._id, {$addToSet: {favorites: mongoose.Types.ObjectId(req.params.id)}}, {new: true})
      .then((user)=> {
          console.log(user)
          res.status(200).send({favorite: (user.favorites.indexOf(req.params.id) > -1)})

      })
      .catch((error)=> {
          console.error(error)
          next(error)
      })

})


module.exports = router;
