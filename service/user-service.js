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
  });
  return user;
};

export const loginUserService = async ({
  email,
  password
}) => {
  let userFounded;
  if (email) userFounded = await userModel.findOne({ email })
  // Validate user existence without throwing an error (for internal usage)
  if (!userFounded) {
    return null; // Indicate user not found
  }
  const passwordMatch = await bcrypt.compare(password, userFounded.password);
  if (!passwordMatch) {
    return null; // Indicate invalid password
  }
  const payload = {
    userFounded,
  }
  const accessToken = await jwt.sign(
    payload,
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: '15m' }
  )
  return { accessToken, userFounded }
}