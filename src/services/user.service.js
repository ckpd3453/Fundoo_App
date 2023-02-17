import User from '../models/user.model';
import HttpStatus from 'http-status-codes';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

async function userCheck(body) {
  const users = await getAllUsers();
  return users.filter((obj) => obj.email == body.email);
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
    if (check[0] == null) {
      const data = await User.create(body);
      response = {
        code: HttpStatus.ACCEPTED,
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

  const check = userCheck(body);
  if (check[0] == null) {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Login Failed',
      message: 'Invalid User Name'
    };
  } else {
    const passwordCheck = check[0].password;
    if (passwordCheck == body.password) {
      response = {
        code: HttpStatus.OK,
        data: req.body.email,
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
