const express = require('express');
const pg = require('../database/index.js')

const router = express.Router();

router.get('/api/:id?', (req, res) => {
  // console.log('router get is invoked', res.data)
  pg.getLiftsByLifterId(req, res);
});

router.post('/api/:id?', (req, res) => {
  // console.log(req.body, `this is req`)
  pg.AddWorkout(req, res);

});

module.exports.router = router;