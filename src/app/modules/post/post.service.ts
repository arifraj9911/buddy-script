import { sendImageToCloudinary } from "../../middleware/sendImageToCloudinary";
import { TPost } from "./post.interface";
import { v4 as uuidv4 } from "uuid";
import { Post } from "./post.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { Types } from "mongoose";
import { TPostService } from "../../types";

const createPostIntoDB = async (
  file: any,
  payload: TPost,
  user: JwtPayload
) => {
  if (file) {
    const imageName = `post-${uuidv4()}`;
    const filePath = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, filePath);
    payload.image = secure_url;
  }

  const isUser = await User.findOne({ email: user.email });

  if (isUser) {
    payload.user = isUser._id as any;
  }

  const result = await Post.create(payload);

  return result;
};

const getPostFromDB = async () => {
  return await Post.find()
    .populate({
      path: "user",
      select: "firstName lastName email",
    })
    .populate({
      path: "comments.user",
      select: "firstName lastName email",
    })
    .populate({
      path: "comments.replies.user",
      select: "firstName lastName email",
    })
    .sort({ postTime: -1 })
    .lean();
};

const likePostIntoDB = async (postId: string, user: JwtPayload) => {
  const postExist = await Post.findById(postId);

  if (!postExist) throw new Error("Post not found!");

  const userEmail = user.email;

  if (!postExist.likes) {
    postExist.likes = { totalCounts: 0, likeInfo: [] };
  }

  const existingLike = postExist.likes.likeInfo?.find(
    (like) => like.email === userEmail
  );

  if (existingLike) {
    existingLike.isLike = !existingLike.isLike;
    postExist.likes.totalCounts = existingLike.isLike
      ? (postExist.likes.totalCounts || 0) + 1
      : (postExist.likes.totalCounts || 0) - 1;
  } else {
    postExist.likes.likeInfo?.push({ email: userEmail, isLike: true });
    postExist.likes.totalCounts = (postExist.likes.totalCounts || 0) + 1;
  }

  await postExist.save();

  return postExist;
};

const commentOnPostIntoDB = async (
  postId: string,
  commentText: string,
  user: JwtPayload
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const isUser = await User.findOne({ email: user.email });
  if (!isUser) {
    throw new Error("User not found");
  }

  const newComment = {
    text: commentText,
    user: isUser._id as Types.ObjectId,
    replies: [],
    likes: { totalCounts: 0, likeInfo: [] },
    createdAt: new Date(),
  };

  if (!post.comments) {
    post.comments = [];
  }

  post.comments.push(newComment as any);
  await post.save();

  return await Post.findById(postId).populate("user").populate("comments.user");
};

const replyToCommentIntoDB = async (
  postId: string,
  commentId: string,
  replyText: string,
  user: JwtPayload
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const isUser = await User.findOne({ email: user.email });
  if (!isUser) {
    throw new Error("User not found");
  }

  const comment = post.comments?.find(
    (c: any) => c._id.toString() === commentId
  );
  if (!comment) {
    throw new Error("Comment not found");
  }

  const newReply = {
    text: replyText,
    user: isUser._id as Types.ObjectId,
    createdAt: new Date(),
  };

  if (!comment.replies) {
    comment.replies = [];
  }

  comment.replies.push(newReply as any);
  await post.save();

  return await Post.findById(postId)
    .populate("user")
    .populate("comments.user")
    .populate("comments.replies.user");
};

const likeCommentIntoDB = async (
  postId: string,
  commentId: string,
  user: JwtPayload
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const userEmail = user.email as string;

  const comment = post.comments?.find(
    (c: any) => c._id.toString() === commentId
  );
  if (!comment) {
    throw new Error("Comment not found");
  }

  // Initialize likes if not exists
  if (!comment.likes) {
    comment.likes = { totalCounts: 0, likeInfo: [] };
  }

  // Check if user already liked
  const existingLike = comment.likes.likeInfo?.find(
    (like) => like.email === userEmail
  );

  if (existingLike) {
    // Toggle like
    existingLike.isLike = !existingLike.isLike;
    comment.likes.totalCounts = existingLike.isLike
      ? (comment.likes.totalCounts || 0) + 1
      : (comment.likes.totalCounts || 0) - 1;
  } else {
    // Add new like
    comment.likes.likeInfo?.push({ email: userEmail, isLike: true });
    comment.likes.totalCounts = (comment.likes.totalCounts || 0) + 1;
  }

  await post.save();
  return post;
};

export const PostService: TPostService = {
  createPostIntoDB,
  getPostFromDB,
  likePostIntoDB,
  commentOnPostIntoDB,
  replyToCommentIntoDB,
  likeCommentIntoDB,
};
