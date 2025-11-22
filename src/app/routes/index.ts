import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";

const router: Router = Router();

const routerModules = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
];

routerModules.forEach((route) => router.use(route.path, route.route));

export default router;
