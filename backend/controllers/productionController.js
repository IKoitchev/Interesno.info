const fileHandler = require('../util/helpers/fileHandler');
const Production = require('../models/production');

exports.saveAll = (req, res, next) => {
  fileHandler.saveToDb();
  res.status(201).send('Saved successfully');
};

exports.getAll = (req, res, next) => {
  const products = Production.getAll().then((result) => {
    res.status(200).send(result);
  });
};
