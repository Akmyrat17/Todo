import express from 'express';
import {
  create,
  findAll,
  findOne,
  update,
} from '../controllers/todo.controller';
import { deserializeUser } from '../middleware/deserializeUser';

const router = express.Router();

router.get('/all', deserializeUser, findAll);
router.post('/', deserializeUser, create);
router.get('/:id', deserializeUser, findOne);
router.patch('/:id', deserializeUser, update);

export default router;
