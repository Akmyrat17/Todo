import { NextFunction, Request, Response } from 'express';
import { createTodoSchema, updateTodoSchema } from '../schemas/todo.schema';
import AppError from '../utils/appError';
import {
  createTodo,
  getAllTodosAdmin,
  getAllTodosUser,
  getById,
  updateTodo,
} from '../services/todo.service';
import { User } from '@prisma/client';
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validated = createTodoSchema.validate(req.body);
  if (validated.error) {
    return next(new AppError(400, validated.error.message));
  } else {
    const { title, desc } = req.body;
    const todo = await createTodo(title, desc, res.locals.user.id);
    return res.status(201).json({
      status: 'success',
      data: {
        todo,
      },
    });
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const todo = await getById(parseInt(id));
  if (!todo) return next(new AppError(404, 'Todo not found'));
  else if (todo.userId !== res.locals.user.id) {
    return next(
      new AppError(403, 'You dont have permission to do this operation')
    );
  } else {
    const updatedTodo = updateTodoSchema.validate(req.body);
    if (updatedTodo.error) {
      return next(new AppError(400, updatedTodo.error.message));
    } else {
      const updated = await updateTodo(
        parseInt(id),
        req.body.title,
        req.body.desc
      );
      return res.status(200).json({
        status: 'success',
        data: {
          updated,
        },
      });
    }
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const todo = await getById(parseInt(id));
  console.log(todo);
  if (!todo) return next(new AppError(404, 'Todo not found'));
  if (todo.userId !== res.locals.user.id)
    return next(
      new AppError(403, 'You dont have permission to do this operation')
    );
  return res.status(200).json({
    status: 'success',
    data: {
      todo,
    },
  });
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = res.locals.user;
  if (user.role === 'admin') {
    return res.status(200).json({
      status: 'success',
      data: {
        todos: await getAllTodosAdmin(),
      },
    });
  } else if (user.role === 'user') {
    return res.status(200).json({
      status: 'success',
      data: {
        todos: await getAllTodosUser(res.locals.user.id),
      },
    });
  }
};
