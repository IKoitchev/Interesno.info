const { exec } = require('child_process');
const path = require('path');
const getDB = require('../database').getDB;
const saveToDb = require('./fileHandler').saveToDb;

const collections = ['prod_opera', 'prod_theatre'];

executePeriodically = (interval = 12000000) => {
  setInterval(scrapeData, interval);
};

scrapeData = () => {
  const cwd = path.resolve('util', 'scrapers');

  const options = {
    env: process.env.PATH,
    cwd: cwd,
  };

  console.log(Date.now());
  console.log('start scraping');

  exec(
    `php opera.php & php ivanvazov.php`,
    options,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      console.log(stdout);
      updateProd();
    }
  );
};

updateProd = () => {
  const db = getDB();

  db.collection(collections[0])
    .drop()
    .then(console.log('Opera collection deleted'))
    .catch(console.log('Could not delete collection ' + collections[0]))
    .then(saveToDb(collections[0]))
    .catch((err) => {
      console.log(
        '------------------------MongoDB ERROR-----------------------'
      );
      console.log(err);
    })
    .then(console.log('New opera data saved'))
    .then(
      db
        .collection(collections[1])
        .drop()
        .then('National theatre collection deleted')
        .catch(console.log('Could not delete collection ' + collections[1]))
        .then(saveToDb(collections[1]))
        .catch((err) => {
          console.log(
            '------------------------MongoDB ERROR-----------------------'
          );
          console.log(err);
        })
        .then(console.log('New theatre data saved'))
    );
};

exports.executePeriodically = executePeriodically;
exports.scrapeData = scrapeData;
