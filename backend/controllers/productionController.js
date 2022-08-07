const fileHandler = require('../util/helpers/fileHandler');

exports.saveAll = (req, res, next) => {
  fileHandler.saveToDb();
  res.status(201).send('Saved successfully');
};

exports.getAll = (req, res, next) => {
  fileHandler
    .getAllProductions()
    .then((result) => res.status(200).send(result));
};
