const express = require('express');
const router  = express.Router();
const Herb    = require ('../models/Herb');

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


module.exports = router;
