const { getDB } = require('../database');
const fs = require('fs');
const path = require('path');

const filePath = path.join(path.resolve('util', 'scrapers', 'mongo.txt'));

saveToDb = () => {
  const db = getDB();

  return db
    .collection('productions')
    .insertMany(readFile())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};

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

readFile = () => {
  const a = fs.readFileSync(filePath);

  return JSON.parse(a);
};

exports.saveToDb = saveToDb;
exports.getAllProductions = getAllProductions;
