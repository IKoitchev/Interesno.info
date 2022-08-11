const { getDB } = require('../database');
const fs = require('fs');
const path = require('path');

saveToDb = (collection) => {
  const db = getDB();

  return db
    .collection(collection)
    .insertMany(readFile(collection))
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};
//opera only
getAllProductions = (filter = null) => {
  const db = getDB();

  return db
    .collection('productions')
    .find(filter)
    .toArray()
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};
//add for theatre

readFile = (filename) => {
  const filePath = path.join(path.resolve('scrapedData', filename + '.txt'));
  const a = fs.readFileSync(filePath);

  return JSON.parse(a);
};

exports.saveToDb = saveToDb;
exports.getAllProductions = getAllProductions;
