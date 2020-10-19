const Clarifai = require('clarifai');
const config = require('../config/config');

const app = new Clarifai.App({
  apiKey: config.clarifaiApiKey,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    //.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json('Error calling Clarifai API');
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  return db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries[0]))
    .catch((err) => {
      res.status(400).json(`Error getting entries for id {id}`);
    });
};

module.exports = { handleImage, handleApiCall };
