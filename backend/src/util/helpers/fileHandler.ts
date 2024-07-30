import * as fs from 'fs';
import logger from '../logger';
import { ProductionDto } from '../../dto/production.dto';

// saveToDb = (collection) => {
//   const db = getDB();

//   return db
//     .collection(collection)
//     .insertMany(readFile(collection))
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => console.log(err));
// };

// //opera only
// getAllProductions = (filter = null) => {
//   const db = getDB();

//   return db
//     .collection('productions')
//     .find(filter)
//     .toArray()
//     .then((res) => {
//       console.log(res);
//       return res;
//     })
//     .catch((err) => console.log(err));
// };
//add for theatre

export async function readFile(filePath: string): Promise<ProductionDto[]> {
  const res = fs.readFileSync(filePath);

  const arr: ProductionDto[] = JSON.parse(String(res));

  // arr.map((p) => {
  //   logger.info(`${p.title} - ${p.link}`);
  // });
  logger.info(arr.length);

  return arr;
}
