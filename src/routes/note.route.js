import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/note.validator';
import * as noteController from '../controllers/note.controller';

const router = express.Router();

router.get('', userAuth, noteController.getAll);
router.post('', newNoteValidator, userAuth, noteController.create);
router.get('/:_id', userAuth, noteController.getById);
router.put('/:_id', newNoteValidator, userAuth, noteController.update);
router.delete('/:_id', userAuth, noteController.deleteById);

export default router;
