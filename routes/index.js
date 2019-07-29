const express = require('express');
const router  = express.Router();
const Herb = require ('../models/Herb');
const mongoose = require("mongoose");

/* GET home page */
router.get('/', (req, res, next) => {
  debugger
  Herb.find({})
  .then((herbs) => {
    res.render('index', {herbs});
  })
  .catch((err) => {
    res.send("Error in index route");
  })
});

/* GET Single Herb Detail */
router.get('/herb', (req, res, next) => {
  res.render('herb');
});


module.exports = router;
