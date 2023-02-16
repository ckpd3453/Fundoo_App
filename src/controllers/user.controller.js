import { error } from '@hapi/joi/lib/base';
import HttpStatus from 'http-status-codes';
import { exceptions } from 'winston';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: 'Password Mismatched',
        message: 'Password Mismatched'
      });
    } else {
      const data = await UserService.newUser(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User Registered successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};
