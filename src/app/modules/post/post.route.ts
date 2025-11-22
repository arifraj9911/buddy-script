import { NextFunction, Request, Response, Router } from "express";
import { PostController } from "./post.controller";
import { upload } from "../../middleware/sendImageToCloudinary";

const router: Router = Router();

router.post(
  "/create",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  PostController.createPost
);

router.get("/", PostController.getPost);

export const PostRoutes = router;
