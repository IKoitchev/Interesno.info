const { exec, spawn } = require('child_process');
const { env } = require('process');
const { CLIENT_RENEG_LIMIT } = require('tls');
const phpFullPath = require('../php_path');
const path = require('path');

executePeriodically = (interval = 120000) => {
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

  exec(`php opera.php`, options, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      return;
    }
    if (stderr) {
      console.log(stderr);
      return;
    }
    console.log(stdout);
  });
};

exports.executePeriodically = executePeriodically;
exports.scrapeData = scrapeData;
