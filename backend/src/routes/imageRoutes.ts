import { Router } from 'express';
import { getImageHandler } from '../controllers/imageController';

const imageRoutes = Router();

imageRoutes.get('/:image', getImageHandler);

export default imageRoutes;
