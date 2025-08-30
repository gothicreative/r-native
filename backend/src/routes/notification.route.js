import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"

import {getNotifications, deleteNotification} from "../controllers/notification.controller.js"

const routes = express.Router()

routes.get("/notification",protectRoute, getNotifications)
routes.delete("/:notificationId", protectRoute, deleteNotification)

export default routes