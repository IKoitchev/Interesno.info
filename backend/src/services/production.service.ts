import { ProductionDto } from '../dto/production.dto';
import ProductionModel from '../models/production';
import logger from '../util/logger';

export async function saveProductions(productions: ProductionDto[]) {
  try {
    const res = await ProductionModel.insertMany(productions);
    return res;
  } catch (error: unknown) {
    logger.error(error);
    throw error;
  }
}

// Filter should be object probably
export async function deleteProductions(filter?: string) {
  try {
    const res = await ProductionModel.deleteMany(filter);
    return res;
  } catch (error: unknown) {
    logger.error(error);
    throw error;
  }
}
