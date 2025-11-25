import { JwtPayload } from "jsonwebtoken";
import { TPost } from "../modules/post/post.interface";

export type TPostService = {
  createPostIntoDB: (
    file: any,
    payload: TPost,
    user: JwtPayload
  ) => Promise<any>;

  getPostFromDB: () => Promise<any>;

  likePostIntoDB: (postId: string, user: JwtPayload) => Promise<any>;

  commentOnPostIntoDB: (
    postId: string,
    commentText: string,
    user: JwtPayload
  ) => Promise<any>;

  replyToCommentIntoDB: (
    postId: string,
    commentId: string,
    replyText: string,
    user: JwtPayload
  ) => Promise<any>;

  likeCommentIntoDB: (
    postId: string,
    commentId: string,
    user: JwtPayload
  ) => Promise<any>;
};