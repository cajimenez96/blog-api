import userModel from '../model/user.js'
import bcrypt from 'bcrypt';

export const findUserService = async (query) => userModel.findOne(query);

export const createUserService = async ({
  name,
  lastName,
  userName,
  password,
  email,
  phoneNumber,
  address,
  country,
  birthday,
}) => {
  const salt = process.env.SALT_ROUNDS;
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await userModel.create({
    name,
    lastName,
    userName,
    password: hashedPassword,
    email,
    phoneNumber,
    address,
    country,
    birthday,
  });
  return user;
};