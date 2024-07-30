import { Request, Response } from 'express';
import * as path from 'path';
import logger from '../util/logger';

export async function getImageHandler(req: Request, res: Response) {
  try {
    console.log(req.params);
    const imageName = req.params?.image;

    res.status(200).sendFile(path.resolve(`./images/${imageName}`));
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).send();
  }
}
