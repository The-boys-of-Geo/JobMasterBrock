import { Request, Response, NextFunction } from 'express';
import db from '../models/userModel';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
const userController: any = {};
const saltRounds = 10;

// TODO: Edit for app
//****** SIGNUP ******//
userController.signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // this req.body should contain the user's username and password
  try {
    const { username, password } = req.body;
    // checks for valid leetcode username
    // checks for if username is already taken
    const usernameCheckQuery = 'SELECT * FROM users WHERE users.username = $1;';
    const usernameCheckValue = [username];
    const checkUsername: QueryResult = await db.query(
      usernameCheckQuery,
      usernameCheckValue
    );
    if (checkUsername.rows.length > 0) {
      return next({
        log: 'Username is taken',
        message: {
          err: 'Username is taken. Please try signing up with a different username.',
        },
      });
    }
    // hashes password and inserts new user into database
    const hashedPassword = await bcrypt.hash(password, saltRounds); // this autogenerates the salt and returns the hashed password in one function
    const queryString =
      'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *;';
    const values = [username, hashedPassword];
    const data = await db.query(queryString, values);
    res.locals.currentUser = data.rows[0];
    return next();
  } catch (error) {
    const err = {
      log: `Error: not able to signup, ${error}`,
      status: 404,
      message: {
        err: 'Error in userController.signup: Check server log for more details.',
      },
    };
    return next(err);
  }
};

//****** LOGIN ******//
userController.login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;
    const usernameCheckValue = [username];
    const usernameCheckQuery = 'SELECT * FROM users WHERE users.username = $1;';
    const user = await db.query(usernameCheckQuery, usernameCheckValue);
    const passwordIsValid = await bcrypt.compare(
      password,
      user.rows[0].password
    ); // will return true if password matches
    //checks if the password is false or if there is no user matching the input param username.
    if (!passwordIsValid || user.rows.length === 0)
      return next({
        log: 'Username or password is invalid',
        message: {
          err: 'Username or password is invalid. Please login with a valid username and password.',
        },
      });
    //stores the data onto local storage if user and pass is successful
    res.locals.currentUser = user.rows[0];
    return next();
  } catch (error) {
    const err = {
      log: `Error: not able to login, ${error}`,
      status: 404,
      message: {
        err: 'Error in userController.login: Check server log for more details.',
      },
    };
    return next(err);
  }
};

userController.addInterestedJob = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, jobData } = req.body;
    console.log('jobData: ', jobData);
    /**
     * jobData = {
     * job_id
    //  * description
     * date_posted
     * remote_or_onsite
     * location
     * company_name
     * title
    //  * website
     * }
     */
    const jobDataCheckQuery = 'SELECT * FROM jobs WHERE jobs.job_id = $1;';
    const jobDataCheckId = [jobData.job_id];
    const checkJobData: QueryResult = await db.query(
      jobDataCheckQuery,
      jobDataCheckId
    );
    if (checkJobData.rows.length === 0) {
      const queryString =
        'INSERT INTO jobs(job_id, date_posted, remote/on-site, location, company_name, title, requirements) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;';
      const values = [
        jobData.job_id,
        jobData.date_posted,
        jobData.remote_or_onsite,
        jobData.location,
        jobData.company_name,
        jobData.title,
      ];
      const data = await db.query(queryString, values);
      console.log('data: ', data);
    }
    return next();
  } catch (error) {
    const err = {
      log: `Error: not able to add interested job to user, ${error}`,
      status: 404,
      message: {
        err: 'Error in userController.addInterestedJob: Check server log for more details.',
      },
    };
    return next(err);
  }
};

userController.removeInterestedJob = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, jobId } = req.body;
  const query = '';
  try {
  } catch (error) {
    const err = {
      log: `Error: not able to scrape LinkedIn URL at jobID, ${error}`,
      status: 404,
      message: {
        err: 'Error in scraperController.scrapeJobInfo: Check server log for more details.',
      },
    };
    return next(err);
  }
};

export default userController;
