const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb://localhost:27017/interesnoDB')
    .then((client) => {
      console.log('Connected');
      _db = client.db('interesnoDB');
      // console.log('-------');
      // console.log(_db);
      callback(client);
    })
    .catch((err) => console.log(err));
};
const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'No db found';
};
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
