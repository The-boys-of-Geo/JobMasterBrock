import { Router, RequestHandler } from 'express';
import express, { Request, Response } from 'express';
const router: Router = express.Router();

import scraperController from '../controllers/scraperController';

router.post(
  '/getLinkedInData',
  scraperController.scrapeData,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.linkedInData);
  }
);

export default router;
