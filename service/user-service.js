import userModel from '../model/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
  role,
}) => {
  const salt = parseInt(process.env.SALT_ROUNDS);
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
    role,
  });
  return user;
};

export const loginUserService = async ({
  email,
  password
}) => {
  let foundUser;
  if (email) foundUser = await userModel.findOne({ email })
  
  if (!foundUser) {
    return null; 
  }
  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch) {
    return null; 
  }
  const payload = {
    foundUser,
  }
  const accessToken = await jwt.sign(
    payload,
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: '15m' }
  )
  return { accessToken, foundUser }
}