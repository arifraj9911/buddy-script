import { sendImageToCloudinary } from "../../middleware/sendImageToCloudinary";
import { TPost } from "./post.interface";
import { v4 as uuidv4 } from "uuid";
import { Post } from "./post.model";

const createPostIntoDB = async (file: any, payload: TPost) => {
  if (file) {
    const imageName = `post-${uuidv4()}`;
    const filePath = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, filePath);
    payload.image = secure_url;
  }

  const result = await Post.create(payload);

  return result;
};

const getPostFromDB = async () => {
  return await Post.find();
};

export const PostService = {
  createPostIntoDB,
  getPostFromDB,
};
