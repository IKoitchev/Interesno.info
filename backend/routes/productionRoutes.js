const express = require('express');
const router = express.Router();

const productionController = require('../controllers/productionController');
const timer = require('../util/helpers/timer');

router.post('/', productionController.saveAll);

router.get('/', productionController.getAll);

router.get('/update', (req, res, next) => {
  // timer.executePeriodically();
  timer.scrapeData();
  res.status(200).send('Scraping started');
});

module.exports = router;
