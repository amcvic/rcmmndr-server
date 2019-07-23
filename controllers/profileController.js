var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Profile = sequelize.import('../models/profile');

router.post('/create', (req, res) => {
  Profile.create({
    artists: [],
    owner: req.user.id
  }).then(
    () => {
      res.json({
        message: 'empty profile created'
      });
    },
    (error) => {
      res.send(500, error.message);
    }
  );
});

router.post('/add', (req, res) => {
  Profile.create({
    artist: req.body.artist,
    url: req.body.url,
    imgUrl: req.body.imgUrl,
    owner: req.user.id
    // artists: sequelize.fn('array_append', sequelize.col('artists'), req.body.artist)
  },
  {where: {owner: req.user.id}})
  .then(
    (data) => {
      res.json({
        message: req.body.artist + ' has been added'
      });
    },
    (error) => {
      res.status(500).send({error: error.message});
    }
  );
});

router.delete('/delete', (req, res) => {
  Profile.destroy({
    where: {artist: req.body.artist, owner: req.user.id}
  })
  .then(
    () => {
      res.json({
        message: req.body.artist + ' has been removed'
      });
    },
    (error) => {
      res.status(500).send({error: error.message});
    }
  );
});

router.get('/get', (req, res) => {
  Profile.findAll({where: {owner: req.user.id}})
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