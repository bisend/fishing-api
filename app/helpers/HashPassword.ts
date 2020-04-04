import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, passwordHash: string) => {
  return bcrypt.compare(password, passwordHash);
};
