const Article = require('../models/article');
const Joi = require('joi');

const articleSchema = Joi.object().keys({
  title: Joi.string().min(2).max(200).required(),
  text: Joi.string().required(),
  pictures: Joi.array().items(Joi.string().required()),
  uploadDate: Joi.date(),
});

exports.save = (req, res, next) => {
  const validationResult = articleSchema.validate(req.body);
  if (validationResult.error == null) {
    const title = req.body.title;
    const text = req.body.text;
    const pictures = req.body.pictures;
    let uploadDate = req.body.uploadDate;

    if (!req.body.uploadDate) {
      uploadDate = Date.now();
    }

    const article = new Article(title, text, pictures, uploadDate);

    article.save().then(() => {
      console.log('Article created!');
      res.status(201).send(article);
    });
  } else {
    res.status(400).send('Invalid input');
  }
};

exports.getAll = (req, res, next) => {
  const articles = Article.fetchAll().then((result) => {
    res.send(200, { articles: result });
  });
};
