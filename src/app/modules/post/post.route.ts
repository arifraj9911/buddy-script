import { NextFunction, Request, Response, Router } from "express";
import { PostController } from "./post.controller";
import { upload } from "../../middleware/sendImageToCloudinary";
import auth from "../../middleware/auth";

const router: Router = Router();

router.post(
  "/create",
  auth(),
  upload.single("image"),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  PostController.createPost
);

router.get("/", auth(), PostController.getPost);

router.patch("/like/:id", auth(), PostController.likePost);

router.post("/comment/:id", auth(), PostController.commentOnPost);

router.post(
  "/:postId/comment/:commentId/reply",
  auth(),
  PostController.replyOnComment
);

router.patch(
  "/:postId/comment/:commentId/like",
  auth(),
  PostController.likeOnComment
);

export const PostRoutes = router;
