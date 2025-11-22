import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import HttpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserInDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await UserService.getUserFromDB();

  sendResponse(res, {
    statusCode: HttpStatus.FOUND,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getUsers,
};
