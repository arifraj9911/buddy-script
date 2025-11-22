import { Router } from "express";
import { UserController } from "./user.controller";

const router: Router = Router();

router.post("/create", UserController.createUser);

router.get("/", UserController.getUsers);

export const UserRoutes = router;
