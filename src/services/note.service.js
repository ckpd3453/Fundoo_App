import noteModel from '../models/note.model';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

//To Get all notes
export const getAll = async (token) => {
  var response;
  const bearerToken = token.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.Jwt_Key);
  const datas = await noteModel.find();
  const data = datas.filter((val) => val.userId === user.data._id);
  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Data retrieved Successfully.'
    };
  } else {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Empty Stack'
    };
  }
  return response;
};

//To create note
export const create = async (body, token) => {
  var response;
  const bearerToken = token.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.Jwt_Key);
  const req = {
    title: body.title,
    describe: body.description,
    colour: body.colour,
    userId: user.data._id
  };
  const data = await noteModel.create(req);
  if (data != null) {
    response = {
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Saved Successfully'
    };
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: data,
      message: 'Client Side Error'
    };
  }
  return response;
};

//To Get Note By Id
export const getById = async (noteId, token) => {
  var response;
  const bearerToken = token.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.Jwt_Key);
  const data = await noteModel.findById(noteId);
  if (data != null) {
    if (data.userId === user.data._id) {
      response = {
        code: HttpStatus.OK,
        data: data,
        message: 'Note Retrived successfully'
      };
    } else {
      response = {
        code: HttpStatus.NOT_FOUND,
        data: null,
        message: 'Invalid Note Id'
      };
    }
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: null,
      message: 'Invalid Note Id'
    };
  }
  return response;
};

//To Update Note using note id
export const update = async (noteId, body, token) => {
  var response;
  const bearerToken = token.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.Jwt_Key);
  const data = await noteModel.findById(noteId);
  if (data != null) {
    if (data.userId === user.data._id) {
      const data = await noteModel.findByIdAndUpdate(noteId, body, {
        new: true
      });
      response = {
        code: HttpStatus.OK,
        data: data,
        message: 'Note Updated Successfully'
      };
    } else {
      response = {
        code: HttpStatus.NOT_FOUND,
        data: 'No Such Note Present for this user.',
        message: 'Note Id does not exist'
      };
    }
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'No Such Note Present for this user.',
      message: 'Note Id does not exist'
    };
  }
  return response;
};

//To delete note using note id
export const deleteById = async (noteId, token) => {
  var response;
  const bearerToken = token.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.Jwt_Key);
  const data = await noteModel.findById(noteId);
  if (data != null) {
    if (data.userId === user.data._id) {
      const data = await noteModel.findByIdAndDelete(noteId);
      response = {
        code: HttpStatus.OK,
        data: 'Deleted',
        message: 'Note deleted successfully'
      };
    } else {
      response = {
        code: HttpStatus.NOT_FOUND,
        data: 'Not Deleted',
        message: 'Note Id does not exist'
      };
    }
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'Not Deleted',
      message: 'Note Id does not exist'
    };
  }
  return response;
};
