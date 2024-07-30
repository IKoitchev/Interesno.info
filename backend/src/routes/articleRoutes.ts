import { getAllArticlesHandler, saveArticleHandler } from '../controllers/articleController';
import { Express, Router } from 'express';

const articlesRoutes = Router();

articlesRoutes.get('/', getAllArticlesHandler);

articlesRoutes.post('/', saveArticleHandler);

export default articlesRoutes;
