import { Router, RequestHandler } from 'express';
import express, { Request, Response } from 'express';
const router: Router = express.Router();

import scraperController from '../controllers/scraperController';

router.post(
  '/getLinkedInData',
  scraperController.scrapeJobListings,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.linkedInData);
  }
);

router.get(
  '/getLinkedInData/:jobID',
  scraperController.scrapeJobInfo,
  (req: Request, res: Response) => {
    res.status(200).send(res.locals.jobData);
  }
);

export default router;
