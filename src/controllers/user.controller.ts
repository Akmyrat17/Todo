import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  findUser,
  findUserById,
  updateUser,
} from '../services/user.service';
import AppError from '../utils/appError';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userLocale = res.locals.user;
  if (userLocale.role === 'admin') {
    const userValidated = createUserSchema.validate(req.body);
    if (userValidated.error) {
      return next(new AppError(400, userValidated.error.message));
    } else {
      const { password, username, email, phone_number, role } = req.body;
      const user = await createUser(
        password,
        username,
        email,
        phone_number,
        role
      );
      if (user) {
        return res.status(201).json({
          status: 'success',
          data: {
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            id: user.id,
          },
        });
      }
      throw new AppError(500, 'Internal server Error');
    }
  }
  return next(
    new AppError(403, 'You dont have permission to do this operation')
  );
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.params.id);
  const userLocale = res.locals.user;
  if (userLocale.role === 'admin' || userLocale.id === id) {
    const user = await findUserById(id);
    if (!user) return next(new AppError(404, 'User not found'));
    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }
  return next(
    new AppError(403, 'You dont have permission to do this operation')
  );
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.params.id);
  const userLocale = res.locals.user;
  if (userLocale.role === 'admin' || userLocale.id === id) {
    const { username, password, phone_number } = req.body;
    const updatedUser = updateUserSchema.validate(req.body);
    if (updatedUser.error) {
      return next(new AppError(400, updatedUser.error.message));
    } else {
      return await updateUser(id, phone_number, password, username);
    }
  }
  return next(
    new AppError(403, 'You dont have permission to do this operation')
  );
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (user.role === 'admin') {
    const users = await findUser();
    if (users.length === 0) return next(new AppError(404, 'User not found'));
    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  }
  return next(
    new AppError(403, 'You dont have permission to do this operation')
  );
};
