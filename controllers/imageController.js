var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Image = sequelize.import('../models/image');

router.post('/add', (req, res) => {
  Image.create({
    artist: req.body.artist,
    img: req.body.img
  }).then(
    () => {
      res.json({
        message: 'image added for ' + req.artist
      });
    },
    (error) => {
      res.send(500, error.message);
    }
  );
});

router.get('/get/:artist', (req, res) => {
  Image.findOne({where: {artist: req.params.artist}})
  .then(
    (data) => {
      res.json(data);
    },
    (error) => {
      res.status(500).send({error: error.message});
    }
  );
});

module.exports = router;