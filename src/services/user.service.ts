import { jwtSecretKey, tokenExpiresIn } from '../utils/constants';
import { signJwt } from '../utils/jwt';
import { PrismaClient, User, UserRole } from '@prisma/client';
import { hashLocal } from '../utils/hash';
const prisma = new PrismaClient();

export const createUser = async (
  password: string,
  username: string,
  email: string,
  phone_number: number,
  role: UserRole
) => {
  const hashed = await hashLocal(password);
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashed,
      phone_number,
      role: role ? role : 'user',
    },
  });
};

export const updateUser = async (
  id: number,
  phone_number: number,
  email: string,
  username: string
) => {
  return await prisma.user.update({
    where: { id },
    data: { phone_number, email, username },
  });
};

export const findUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      email: true,
      phone_number: true,
      id: true,
      role: true,
    },
  });
};

export const findUserByPhoneNumer = async (phone_number: number) => {
  return await prisma.user.findUnique({
    where: { phone_number: phone_number },
  });
};

export const findUser = async () => {
  return await prisma.user.findMany({
    select: {
      username: true,
      email: true,
      phone_number: true,
      id: true,
    },
  });
};
export const signToken = async (user: User) => {
  // Create Access roken
  const access_token = signJwt({ sub: user.id }, jwtSecretKey, {
    expiresIn: `${tokenExpiresIn}m`,
  });

  return { access_token };
};
