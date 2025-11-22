import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import HttpStatus from "http-status";

const login = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "User login successful",
    data: result,
  });
});

export const AuthController = {
  login,
};
