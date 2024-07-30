import { Request, Response } from 'express';
import { ProductionDto } from '../dto/production.dto';
import ProductionModel from '../models/production';
import logger from '../util/logger';
import { saveProductions } from '../services/production.service';

// const fileHandler = require('../util/helpers/fileHandler');
// const Production = require('../models/production');

export async function saveProductionsHandler(req: Request, res: Response) {
  try {
    const input = req.body as ProductionDto[];
    const result = await saveProductions(input);

    logger.info(`Saved ${result.length} productions`);

    res.status(201).send('Productions created.');
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).send();
  }
}

export async function getProductionsHandler(req: Request, res: Response) {
  try {
    const filter = req.query?.date;
    logger.info(filter);

    const productions = await ProductionModel.find(filter ? { 'dates.date': filter } : null);

    res.send(productions);
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).send();
  }
}

// exports.saveAll = (req, res, next) => {
//   fileHandler.saveToDb();
//   res.status(201).send('Saved successfully');
// };

// exports.getAll = (req, res, next) => {
//   const products = Production.getAll().then((result) => {
//     res.status(200).send(result);
//   });
// };
