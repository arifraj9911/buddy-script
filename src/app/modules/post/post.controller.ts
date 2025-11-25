import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { PostService } from "./post.service";

const createPost = catchAsync(async (req, res) => {

  const result = await PostService.createPostIntoDB(
    req.file,
    req.body,
    req.user
  );

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

const likePost = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PostService.likePostIntoDB(id as string, req.user);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "Like added successfully",
    data: result,
  });
});

const commentOnPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const result = await PostService.commentOnPostIntoDB(
    id as string,
    text,
    req.user
  );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "comment added successfully",
    data: result,
  });
});

const replyOnComment = catchAsync(async (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;
  const result = await PostService.replyToCommentIntoDB(
    postId as string,
    commentId as string,
    text,
    req.user
  );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "reply on comment successfully",
    data: result,
  });
});

const likeOnComment = catchAsync(async (req, res) => {
  const { postId, commentId } = req.params;
  const result = await PostService.likeCommentIntoDB(
    postId as string,
    commentId as string,
    req.user
  );
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: "like on comment successfully",
    data: result,
  });
});

export const PostController = {
  createPost,
  getPost,
  likePost,
  commentOnPost,
  replyOnComment,
  likeOnComment,
};
