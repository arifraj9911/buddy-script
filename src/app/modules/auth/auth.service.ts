import { config } from "../../config";
import { getToken } from "../../utils/getToken";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";

const loginUser = async (payload: TLogin) => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (!isUserExist) throw Error("User not found!");

  if (isUserExist.password !== payload.password)
    throw Error("Password did not match!");

  const jwtPayload = {
    firstName: isUserExist.firstName,
    lastName: isUserExist.lastName,
    email: isUserExist.email,
  };

  const token = getToken(
    jwtPayload,
    config.access_token_secret as string,
    config.token_duration as string
  );

  return {
    access_token: token,
  };
};

export const AuthService = {
    loginUser
}
