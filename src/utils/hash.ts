import bcryptjs from 'bcryptjs';
const salt = bcryptjs.genSaltSync(10);
export const hashLocal = async (password: string) => {
  return bcryptjs.hashSync(password, salt);
};

export const compareLocal = async (password: string, hash: string) => {
  return bcryptjs.compareSync(password, hash);
};
