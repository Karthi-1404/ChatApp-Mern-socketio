import express from "express";
import {friendStatus} from "../controllers/friendsController/fnd.controller.js";
import {friendList} from "../controllers/friendsController/friends.list.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router()


router.post("/request/:id",protectRoute, friendStatus);
router.get("/friends",protectRoute, friendList);

export default router

