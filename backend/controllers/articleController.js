const Article = require('../models/article');

exports.save = (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const pictures = req.body.pictures;
  let uploadDate = req.body.uploadDate;

  if (!req.body.uploadDate) {
    uploadDate = Date.now();
  }

  const article = new Article(title, text, pictures, uploadDate);
  console.log(req.body);

  article.save().then(() => {
    console.log('Article created!');
    res.status(201).send(article);
  });
};

exports.getAll = (req, res, next) => {
  const articles = Article.fetchAll().then((result) => {
    res.send(200, { articles: result });
  });
};
