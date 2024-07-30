import { Express, Router } from 'express';
import { getProductionsHandler, saveProductionsHandler } from '../controllers/productionController';
import { scrapeData } from '../util/helpers/timer';

// const timer = require('../util/helpers/timer');

const productionRoutes = Router();

productionRoutes.post('/', saveProductionsHandler);

productionRoutes.get('/', getProductionsHandler);

productionRoutes.get('/update', (req, res, next) => {
  // timer.executePeriodically();
  scrapeData();
  res.status(200).send('Scraping started');
});

export default productionRoutes;
