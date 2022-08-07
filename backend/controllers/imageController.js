var path = require('path');

exports.getImage = (req, res, next) => {
  const image = req.params.image;

  res.status(200).sendFile(path.resolve(`./images/${image}`));
};
