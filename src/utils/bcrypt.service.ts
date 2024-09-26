import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string, times?: number) => {
  return bcrypt.hashSync(password, times || 12);
};

export const comparePassword = async ({
  inputPassword,
  userPassword,
}: {
  inputPassword: string;
  userPassword: string;
}) => {
  return bcrypt.compareSync(inputPassword, userPassword);
};
