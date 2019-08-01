const express = require('express');
const router  = express.Router();
const Herb    = require ('../models/Herb');

router.post('/', (req, res, next) => {

  Herb.find({ $or: [
    {commonName: {$regex: ".*" + req.body.search + ".*", $options: 'i'}}, 
    {latinName: {$regex: ".*" + req.body.search + ".*", $options: 'i'}}
  ]})
  .then((herbs) => {
    if (herbs.length <= 0) {
      res.render('empty-search');
    } else {
      res.render('index', {herbs});
    }
    
  })
  .catch((err) => {
    res.send('Error in searching route');
  })
})

router.post('/query', (req, res, next) => {
  Herb.find({ $and: [{waterNeed: req.body.water}, {lightNeed: req.body.light}] })
  .then((herbs) => {
    console.log(herbs);
    if (herbs.length <= 0) { 
      res.render('empty-search');
    } else {
      res.render('index', {herbs});
    }
    
  })
  .catch((err) => {
    res.send('Error in sliding route');
  })
})

module.exports = router;
