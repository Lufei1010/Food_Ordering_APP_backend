import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// sets up a POST endpoint at /api/my/users for creating a new user
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser)
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);// Set up the PUT route for updating a user with validation and middleware


export default router; //export it for use in the app

//handler and controller that handles the request