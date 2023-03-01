import noteModel from '../models/note.model';
import HttpStatus from 'http-status-codes';
import { client } from '../config/redisDb';

//To Get all notes
export const getAll = async (userId) => {
  var response;
  const data = await noteModel.find({ userId: userId });
  if (data != null) {
    await client.set('getall', JSON.stringify(data));
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
  var response;
  console.log(await client.del('getall'));
  const data = await noteModel.create(body);
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
export const getById = async (noteId, userId) => {
  var response;
  const data = await noteModel.find({ _id: noteId, userId: userId });
  if (data[0] != null) {
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
  return response;
};

//To Update Note using note id
export const update = async (noteId, body) => {
  var response;
  const data = await noteModel.find({ _id: noteId, userId: body.userId });
  if (data[0] != null) {
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
  return response;
};

//To delete note using note id
export const deleteById = async (noteId, userId) => {
  var response;

  const data = await noteModel.findById({ _id: noteId, userId: userId });

  if (data != null) {
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
  return response;
};

//To archive || Unarchive
export const archive = async (noteId, userId) => {
  var response;
  const data = await getById(noteId, userId);
  if (data.data != null) {
    const isArchived = data.data[0].archive == false ? true : false;
    const registration = {
      title: data.data[0].title,
      description: data.data[0].description,
      colour: data.data[0].colour,
      archive: isArchived,
      trash: data.data[0].trash,
      userId: data.data[0].userId
    };
    const datas = await noteModel.findByIdAndUpdate(noteId, registration, {
      new: true
    });
    response = {
      code: HttpStatus.OK,
      data: datas,
      message: 'Note Updated Successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'No Such Note Present for this user.',
      message: 'Note Id does not exist'
    };
  }
  return response;
};

//To Trash || Untrash
export const trash = async (noteId, userId) => {
  var response;
  const data = await getById(noteId, userId);
  if (data.data != null) {
    const isTrashed = data.data[0].trash == false ? true : false;
    const registration = {
      title: data.data[0].title,
      description: data.data[0].description,
      colour: data.data[0].colour,
      archive: data.data[0].archive,
      trash: isTrashed,
      userId: data.data[0].userId
    };
    const datas = await noteModel.findByIdAndUpdate(noteId, registration, {
      new: true
    });
    response = {
      code: HttpStatus.OK,
      data: datas,
      message: 'Note Updated Successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: 'No Such Note Present for this user.',
      message: 'Note Id does not exist'
    };
  }
  return response;
};

// //To Get ALl Trash Note
// export const getAllTrash = async (token) => {
//   var response;
//   const user = userVerification(token);
//   const datas = await noteModel.find();
//   const data = datas
//     .filter((val) => val.userId === user.data._id)
//     .filter((note) => note.trash === true);
//   if (data != null) {
//     response = {
//       code: HttpStatus.OK,
//       data: data,
//       message: 'Data retrieved Successfully.'
//     };
//   } else {
//     response = {
//       code: HttpStatus.OK,
//       data: data,
//       message: 'Empty Stack'
//     };
//   }
//   return response;
// };

// //To Get All Archive Note
// export const getAllArchive = async (token) => {
//   var response;
//   const user = userVerification(token);
//   const datas = await noteModel.find();
//   const data = datas
//     .filter((val) => val.userId === user.data._id)
//     .filter((note) => note.archive == true);
//   if (data != null) {
//     response = {
//       code: HttpStatus.OK,
//       data: data,
//       message: 'Data retrieved Successfully.'
//     };
//   } else {
//     response = {
//       code: HttpStatus.OK,
//       data: data,
//       message: 'Empty Stack'
//     };
//   }
//   return response;
// };
