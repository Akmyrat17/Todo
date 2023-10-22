import express from 'express';
import {
  create,
  getAll,
  getById,
  getMeHandler,
  update,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();
// Middleware for all
router.use(deserializeUser);

// Get currently logged in user
router.get('/me', requireUser, getMeHandler);
router.post('/create', create);
router.get('/:id', getById);
router.get('/', getAll);
router.patch('/:id', update);

export default router;
