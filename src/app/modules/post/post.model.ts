import mongoose, { Schema, Types } from "mongoose";
import {
  TComments,
  TLikes,
  TLikeUser,
  TPost,
  TReplies,
} from "./post.interface";

const likeUserSchema = new Schema<TLikeUser>({
  email: { type: String },
  isLike: { type: Boolean },
});

const likeSchema = new Schema<TLikes>({
  totalCounts: { type: Number },
  likeInfo: [likeUserSchema],
});

const repliesSchema = new Schema<TReplies>({
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new Schema<TComments>({
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  replies: [repliesSchema],
  likes: likeSchema,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new Schema<TPost>({
  text: { type: String, required: true },
  image: { type: String, required: false, default: "", trim: true },
  isPublic: { type: Boolean, default: true },
  postTime: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: likeSchema,
  comments: [commentSchema],
});

export const Post = mongoose.model<TPost>("Post", postSchema);
