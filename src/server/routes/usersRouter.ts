import { Router, RequestHandler } from 'express';
import express, { Request, Response } from 'express';
const router: Router = express.Router();

import userController from '../controllers/userController';

router.get('/login', userController.login, (req: Request, res: Response) => {
  res.status(200).json(res.locals.test);
});

router.post(
  '/interested',
  userController.addInterestedJob,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.test);
  }
);

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  res.status(200).json('Successfully Signed Up');
});
router.post('/login', userController.login, (req: Request, res: Response) => {
  res.status(200).json('Successfully Logged In');
});
export default router;
