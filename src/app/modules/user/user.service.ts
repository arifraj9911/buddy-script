import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInDB = async (payload: TUser) => {
  const isUserExistByEmail = await User.findOne({ email: payload.email });

  if (isUserExistByEmail)
    throw new Error("User is already exist by this email!");

  const result = await User.create(payload);

  return result;
};

const getUserFromDB = async () => {
  const result = await User.find();

  return result;
};

export const UserService = {
  createUserInDB,
  getUserFromDB,
};
