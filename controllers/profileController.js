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

router.put('/add', (req, res) => {
  Profile.update({
    artists: sequelize.fn('array_append', sequelize.col('artists'), req.body.artist)
  },
  {where: {id: req.user.id}})
  .then(
    (data) => {
      res.json({
        artist: req.body.artist
      });
    },
    (error) => {
      res.status(500).send({error: error.message});
    }
  );
});

router.put('/delete', (req, res) => {
  Profile.update({
    artists: sequelize.fn('array_remove', sequelize.col('artists'), req.body.artist)
  },
  {where: {id: req.user.id}})
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