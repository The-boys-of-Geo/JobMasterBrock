import { Request, Response, NextFunction } from 'express';

const userController: any = {};

//****** LOGIN ******//
userController.login = async function (req: Request, res: Response, next: NextFunction) {

  res.locals.test = 'howdy';
  return next();
}


export default userController;