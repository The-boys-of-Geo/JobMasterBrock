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

router.get(
  '/applications/:userId',
  userController.getUserApps,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.userApps);
  }
);

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.currentUser);
});
router.post('/login', userController.login, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.currentUser);
});
export default router;
