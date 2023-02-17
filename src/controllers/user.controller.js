import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    console.log('in Controller');
    const data = await UserService.newUser(req.body);
    res.status(data.code).json({
      code: data.code,
      data: data.data,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for user login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const db = await UserService.getAllUsers();
    const check = db.filter((obj) => req.body.email == obj.email);
    if (check[0] == null) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: 'Login Failed',
        message: 'Invalid User Name'
      });
    } else {
      const passwordCheck = check[0].password;
      if (passwordCheck == req.body.password) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: req.body.email,
          message: 'Log in Successful'
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: 'Login Failed',
          message: 'Invalid User Password'
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
