import { PrismaClient } from '@prisma/client';
import { getAll } from '../controllers/user.controller';

const prisma = new PrismaClient();
export const createTodo = async (
  title: string,
  desc: string,
  userId: number
) => {
  return await prisma.todo.create({
    data: {
      title: title,
      desc: desc,
      userId: userId,
    },
  });
};
export const updateTodo = async (id: number, title: string, desc: string) => {
  return await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      desc,
    },
  });
};

export const deleteTodo = async (id: number) => {
  return await prisma.todo.delete({
    where: {
      id,
    },
  });
};

export const getById = async (id: number) => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
  });
};

export const getAllTodosUser = async (id: number) => {
  return await prisma.todo.findMany({
    where: { userId: id },
  });
};
export const getAllTodosAdmin = async () => {
  return await prisma.todo.findMany();
};
