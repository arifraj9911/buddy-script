import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { PostService } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const result = await PostService.createPostIntoDB(req.file, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: "Post is created successfully",
    data: result,
  });
});

const getPost = catchAsync(async (req, res) => {
  const result = await PostService.getPostFromDB();

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Post retrieved successfully",
    data: result,
  });
});

export const PostController = {
  createPost,
  getPost,
};
