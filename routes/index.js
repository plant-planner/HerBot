const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET Single Herb Detail */
router.get('/herb', (req, res, next) => {
  res.render('herb');
});


module.exports = router;
