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

router.post('/sliders', (req, res, next) => {
  var waterInt = parseInt(req.body.water);
  var lightInt = parseInt(req.body.light)

  Herb.find({ $and: [{waterNeed: {$gte: waterInt}}, {lightNeed: {$gte: lightInt}}] })
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
