import express from 'express';
import cors from 'cors';
import connect from './util/db.connect';
import productionRoutes from './routes/productionRoutes';
import imageRoutes from './routes/imageRoutes';
import articlesRoutes from './routes/articleRoutes';
import morgan from 'morgan';
import logger from './util/logger';

import { scrapeData } from './util/helpers/timer';

const app = express();
const port = process.env.PORT ?? '3005';
const clientPort = process.env.CLIENT_PORT ?? '3000';

app.use(
  cors({
    origin: `http://localhost:${clientPort}`,
  })
);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json()); // Body parser

app.use('/articles', articlesRoutes);
app.use('/images', imageRoutes);
app.use('/productions', productionRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not Found</h1>');
});

app.listen(port, async () => {
  await connect();
  // scrapeData();

  logger.info(`Server running on http://localhost:${port}`);
  // timer.executePeriodically();
});
