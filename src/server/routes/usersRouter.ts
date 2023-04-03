import { Router, RequestHandler } from 'express';
import express, { Request, Response } from 'express';
const router: Router = express.Router();

import userController from '../controllers/userController';

router.get('/login', userController.login, (req: Request, res: Response) => {
  res.status(200).json(res.locals.test);
})

export default router;