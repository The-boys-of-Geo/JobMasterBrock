import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app: Application = express();

//****** ROUTES ******//
import users from './routes/usersRouter';
import scraper from './routes/scrapeRouter';

//****** PORT ******//
const PORT = 3000;

//****** FILTERS ******//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//****** REQUESTS ******//
app.use('/api/users', users);
app.use('/api/search', scraper);

//****** ERROR HANDLERS ******//
app.use('*', (req: Request, res: Response) =>
  res.status(404).json('ERROR 404: not found')
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Server Error',
    status: 500,
    message: { err: 'something went terribly wrong 0_o' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message.err);
});

app.listen(PORT, () => {
  console.log(`server listening on PORT:${PORT}`);
});
