import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
import * as bcrypt from '../middlewares/bcrypt.middleware';

// //get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

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

  const check = await userCheck(body);
  console.log('************************', check);
  if (check == null) {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Login Failed',
      message: 'Invalid User Name'
    };
  } else {
    const savedPassword = check.password;
    const passwordCheck = await bcrypt.match(body.password, savedPassword);
    if (passwordCheck) {
      response = {
        code: HttpStatus.OK,
        data: body.email,
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
