const getDB = require('../util/database').getDB;

class Production {
  constructor(link, title, place, dates) {
    this.link = link;
    this.title = title;
    this.place = place;
    this.dates = dates;
  }

  static getAll() {
    const db = getDB();
    const allProds = [];

    return db
      .collection('prod_opera')
      .find()
      .toArray()
      .then((prods) => {
        allProds.push(...prods);
        console.log('---------------------------------------------');
        console.log(allProds.length);
        return db
          .collection('prod_theatre')
          .find()
          .toArray()
          .then((prods) => {
            allProds.push(...prods);
            console.log('all products length: ' + allProds.length);

            return allProds;
          });
      });
  }
}

module.exports = Production;
