import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/note.validator';
import * as noteController from '../controllers/note.controller';

const router = express.Router();

//To Get All Notes of Particular user
router.get('', userAuth, noteController.getAll);

// //Get All Trash Notes
// router.get('/trashed', userAuth, noteController.getAllTrash);

// //Get All Archive Notes
// router.get('/archive', userAuth, noteController.getAllArchive);

//To Create new notes for Particular user
router.post('', newNoteValidator, userAuth, noteController.create);

//Get Notes by ID of Particular user
router.get('/:_id', userAuth, noteController.getById);

//Update Notes of Particular user
router.put('/:_id', newNoteValidator, userAuth, noteController.update);

//Deletes Notes of Particular user
router.delete('/:_id', userAuth, noteController.deleteById);

//Trash Notes of Particular user
router.put('/trash/:_id', userAuth, noteController.trash);

//Archive notes of Particular user
router.put('/archive/:_id', userAuth, noteController.archive);

export default router;
