import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
import * as bcrypt from '../middlewares/bcrypt.middleware';
import * as jwt from '../middlewares/jwt.middleware';

async function userCheck(body) {
  return await User.findOne({ email: body.email });
}

//create new user
export const newUser = async (body) => {
  var response;
  if (body.password !== body.confirmPassword) {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Password Mismatched',
      message: 'Password Mismatched'
    };
  } else {
    const check = await userCheck(body);
    if (check == null) {
      const registration = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcrypt.securePassword(body.password)
      };
      const data = await User.create(registration);
      response = {
        code: HttpStatus.CREATED,
        data: data,
        message: 'User is Registered Successfully'
      };
    } else {
      response = {
        code: HttpStatus.BAD_REQUEST,
        data: 'User is Already Registered',
        message: 'User is Already Registered'
      };
    }
  }
  return response;
};

//Login
export const login = async (body) => {
  var response;

  const user = await userCheck(body);
  if (user == null) {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Login Failed',
      message: 'Invalid User Name'
    };
  } else {
    const savedPassword = user.password;
    const passwordCheck = await bcrypt.match(body.password, savedPassword);
    if (passwordCheck) {
      const token = jwt.jwtToken(user);
      const responseData = {
        user: user,
        Auth: token
      };
      response = {
        code: HttpStatus.OK,
        data: responseData,
        message: 'Log in Successful'
      };
    } else {
      response = {
        code: HttpStatus.BAD_REQUEST,
        data: 'Login Failed',
        message: 'Invalid User Password'
      };
    }
  }
  return response;
};
