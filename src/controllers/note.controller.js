import HttpStatus from 'http-status-codes';
import * as noteService from '../services/note.service';

/**
 * Get All saved Notes
 * @param {Object} req
 * @param {Object} res
 */
export const getAll = async (req, res) => {
  const data = await noteService.getAll(req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Create a Note
 * @param {request} req
 * @param {respose} res
 */
export const create = async (req, res) => {
  const data = await noteService.create(req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Get Note By Id
 * @param {Object} req
 * @param {Object} res
 */
export const getById = async (req, res) => {
  const data = await noteService.getById(req.params._id, req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Update note by Id
 * @param {Object} req
 * @param {Object} res
 */
export const update = async (req, res) => {
  const data = await noteService.update(req.params._id, req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Delete note by Id
 * @param {Object} req
 * @param {Object} res
 */
export const deleteById = async (req, res) => {
  const data = await noteService.deleteById(req.params._id, req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Trash Notes || Untrash Notes
 * @param {Object} req
 * @param {Object} res
 */
export const trash = async (req, res) => {
  const data = await noteService.trash(req.params._id, req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Archive Notes || UnArchive Notes
 * @param {Object} req
 * @param {Object} res
 */
export const archive = async (req, res) => {
  const data = await noteService.archive(req.params._id, req.body.userId);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

// /**
//  * Get All trashed Notes
//  * @param {Object} req
//  * @param {Object} res
//  */
// export const getAllTrash = async (req, res) => {
//   const data = await noteService.getAllTrash();
//   res.status(data.code).json({
//     code: data.code,
//     data: data.data,
//     message: data.message
//   });
// };

// /**
//  * Get All archived Notes
//  * @param {Object} req
//  * @param {Object} res
//  */
// export const getAllArchive = async (req, res) => {
//   const data = await noteService.getAllArchive();
//   res.status(data.code).json({
//     code: data.code,
//     data: data.data,
//     message: data.message
//   });
// };
