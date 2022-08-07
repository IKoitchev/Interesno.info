const getDB = require('../util/database').getDB;

class Article {
  constructor(title, text, pictures, uploadDate) {
    this.title = title;
    this.text = text;
    this.pictures = pictures;
    this.uploadDate = uploadDate;
  }
  save() {
    const db = getDB();
    return db
      .collection('articles')
      .insertOne(this)
      .then((result) => {
        //console.log(result);
      })
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getDB();

    return db
      .collection('articles')
      .find()
      .toArray()
      .then((products) => {
        // console.log('--------------------------------------');
        // console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Article;
