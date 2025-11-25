import { config } from "../config";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Unauthorized!");
    }

    const decoded = jwt.verify(
      token,
      config.access_token_secret as string
    ) as JwtPayload;

    const { firstName, lastName, email } = decoded;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw new Error("User not found with this email!");
    }

    req.user = decoded;
    next();
  });
};

export default auth;
