import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app: Application = express();

//****** ROUTES ******//
import users from './routes/usersRouter';

//****** PORT ******//
const PORT = 3000;

//****** FILTERS ******//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//****** REQUESTS ******//
app.use('/api/users', users);

//****** ERROR HANDLERS ******//

app.use('*', (req: Request, res: Response) => res.status(404).json('ERROR 404: not found'));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errObj = {};
  const defaultErr = {
    message: 'server error',
    error: 500,
    log: 'something went terribly wrong 0_o',
  };
  Object.assign(errObj, defaultErr, err);
  return next(errObj);
});

app.listen(PORT, () => {
  console.log(`server listening on PORT:${PORT}`);
});
