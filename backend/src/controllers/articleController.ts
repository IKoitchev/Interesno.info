import { Request, Response } from 'express';
import { ArticleDto } from '../dto/article.dto';
import ArticleModel from '../models/article';
import logger from '../util/logger';

// const Article = require('../models/article');
// const Joi = require('joi');

export async function saveArticleHandler(req: Request, res: Response) {
  try {
    const input = req.body as ArticleDto;
    const article = await ArticleModel.create({ ...input });

    // logger.info(article.toJSON());
    res.send(article);
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).send();
  }
}
export async function getAllArticlesHandler(req: Request, res: Response) {
  try {
    const articles = await ArticleModel.find();
    res.send(articles);
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).send();
  }
}
