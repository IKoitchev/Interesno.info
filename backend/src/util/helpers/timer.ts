import logger from '../logger';
import { exec, type ProcessEnvOptions } from 'child_process';
import * as path from 'path';
import { deleteProductions, saveProductions } from '../../services/production.service';
import { readFile } from './fileHandler';

export const executePeriodically = (interval = 12000000) => {
  setInterval(scrapeData, interval);
};

export const scrapeData = () => {
  const root = path.dirname(require.main.filename);
  const cwd = path.resolve(root, '../scrapers');

  logger.info(root);
  const options: ProcessEnvOptions = {
    env: process.env,
    cwd,
  };

  logger.info(Date.now());
  logger.info('start scraping');

  exec(
    `php opera.php & php ivanvazov.php`,
    options,
    async (error: unknown, stdout: unknown, stderr: unknown) => {
      if (error) {
        logger.info(error);
        return;
      }
      if (stderr) {
        logger.info(stderr);
        return;
      }
      logger.info(stdout);
      // updateProd();
      try {
        await deleteProductions();
        for (const file of ['prod_opera.txt', 'prod_theatre.txt']) {
          const filePath = path.resolve(root, '../scrapedData', file);

          logger.info(`Fetching productions from ${file}`);

          const productions = await readFile(filePath);

          await saveProductions(productions);
        }
      } catch (error: unknown) {
        logger.error(error);
      }
    }
  );
};

// export const updateProd = () => {
//   const db = getDB();

//   db.collection(collections[0])
//     .drop()
//     .then(logger.info('Opera collection deleted'))
//     .catch(logger.info('Could not delete collection ' + collections[0]))
//     .then(saveToDb(collections[0]))
//     .catch((err: unknown) => {
//       logger.info('------------------------MongoDB ERROR-----------------------');
//       logger.info(err);
//     })
//     .then(logger.info('New opera data saved'))
//     .then(
//       db
//         .collection(collections[1])
//         .drop()
//         .then('National theatre collection deleted')
//         .catch(logger.info('Could not delete collection ' + collections[1]))
//         .then(saveToDb(collections[1]))
//         .catch((err: unknown) => {
//           logger.info('------------------------MongoDB ERROR-----------------------');
//           logger.info(err);
//         })
//         .then(logger.info('New theatre data saved'))
//     );
// };
