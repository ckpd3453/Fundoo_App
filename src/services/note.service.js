import noteModel from '../models/note.model';
import HttpStatus from 'http-status-codes';

//To Get all notes
export const getAll = async () => {
  var response;
  const data = await noteModel.find();
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
export const create = async (body) => {
  console.log(body);
  var response;
  const data = await noteModel.create(body);
  console.log(data);
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
export const getById = async (id) => {
  var response;
  const data = await noteModel.findById(id);
  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Note Retrived successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: data,
      message: 'Invalid Note Id'
    };
  }
  return response;
};

//To Update Note using note id
export const update = async (_id, body) => {
  var response;
  const data = await noteModel.findByIdAndUpdate({ _id }, body, { new: true });
  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Note Updated Successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: data,
      message: 'Note Id does not exist'
    };
  }
  return response;
};

//To delete note using note id
export const deleteById = async (id) => {
  var response;
  const data = await noteModel.findByIdAndDelete(id);
  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Note deleted successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: data,
      message: 'Note Id does not exist'
    };
  }
  return response;
};
