const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');
const imageRoutes = require('./routes/imageRoutes');
const productionRoutes = require('./routes/productionRoutes');
const mongoConnect = require('./util/database').mongoConnect;
const timer = require('./util/helpers/timer');

const app = express();
const PORT = 3005;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/articles', articleRoutes);
app.use('/images', imageRoutes);
app.use('/productions', productionRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not Found</h1>');
});

mongoConnect((client) => {
  app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
  timer.executePeriodically();
});
