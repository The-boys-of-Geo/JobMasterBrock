import { Router, RequestHandler } from 'express';
import express, { Request, Response } from 'express';
const router: Router = express.Router();

import userController from '../controllers/userController';

router.post(
  '/interested',
  userController.addInterestedJob,
  (req: Request, res: Response) => {
    res.status(200).json('Successfully added interested job!');
  }
);

router.delete(
  '/interested',
  userController.removeJob,
  (req: Request, res: Response) => {
    res.status(200).json("Job ID successfully deleted from User's list");
  }
);

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  res.status(200).json('Successfully Signed Up');
});
router.post('/login', userController.login, (req: Request, res: Response) => {
  res.status(200).json('Successfully Logged In');
});
export default router;
