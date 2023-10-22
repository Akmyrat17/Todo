import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  findUserByPhoneNumer,
  signToken,
} from '../services/user.service';
import { PrismaClient } from '@prisma/client';
import { compareLocal } from '../utils/hash';
import AppError from '../utils/appError';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
const prisma = new PrismaClient();
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username, phone_number } = req.body;
  await createUserSchema.validateAsync(req.body).catch((err) => {
    return next(new AppError(400, err.message));
  });
  const user = await createUser(
    password,
    username,
    email,
    phone_number,
    'user'
  );

  if (!user) return next(new AppError(500, 'Internal server Error'));

  const token = await signToken(user);
  return res.status(201).json({
    status: 'success',
    data: {
      token,
    },
  });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone_number, password } = req.body;
  await loginUserSchema.validateAsync(req.body).catch((err) => {
    return next(new AppError(400, err.message));
  });
  const user = await findUserByPhoneNumer(phone_number);
  if (!user) return next(new AppError(404, 'User not found'));
  const isValid = await compareLocal(password, user.password);
  if (!isValid) return next(new AppError(401, 'Invalid credentials'));
  const token = await signToken(user);
  return res.status(200).json({
    status: 'success',
    data: {
      token,
    },
  });
};
