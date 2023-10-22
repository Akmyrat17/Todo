import { TypeOf, number, object, string, z } from 'zod';

enum RoleUser {
  ADMIN = 'admin',
  USER = 'user',
}
import joi from 'joi';

export const createUserSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(16).required(),
  role: joi.string().valid(RoleUser.ADMIN, RoleUser.USER).optional(),
  phone_number: joi.number().required().min(61000000).max(65999999),
});

export const updateUserSchema = joi.object({
  phone_number: joi.number().required().min(61000000).max(65999999),
  email: joi.string().email().required(),
  username: joi.string().required(),
});

export const loginUserSchema = joi.object({
  phone_number: joi.number().required().min(61000000).max(65999999),
  password: joi.string().min(8).max(16).required(),
});
