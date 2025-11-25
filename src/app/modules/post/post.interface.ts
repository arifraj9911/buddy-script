import mongoose from "mongoose";

export type TUserRef = mongoose.Schema.Types.ObjectId;

export type TLikeUser = {
  email: string;
  isLike: boolean;
};

export type TLikes = {
  totalCounts: number;
  likeInfo: TLikeUser[];
};

export type TReplies = {
  text: string;
  user: TUserRef;
  createdAt: Date;
};

export type TComments = {
  text: string;
  user: TUserRef;
  createdAt: Date;
  replies: TReplies[];
  likes: TLikes;
};

export type TPost = {
  text: string;
  image?: string;
  isPublic: boolean;
  postTime: Date;
  user: TUserRef;
  likes?: TLikes;
  comments?: TComments[];
};
