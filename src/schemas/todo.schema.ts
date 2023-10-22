import joi from 'joi';

export const createTodoSchema = joi.object({
  title: joi.string().required(),
  desc: joi.string().required(),
});

export const updateTodoSchema = createTodoSchema;
