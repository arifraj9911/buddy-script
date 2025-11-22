import mongoose, { Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
  text: { type: String, required: true },
  image: { type: String, required: false, default: "", trim: true },
});

export const Post = mongoose.model<TPost>("Post", postSchema);
