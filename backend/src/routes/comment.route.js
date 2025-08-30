import express from "express"

import { protectRoute } from "../middleware/auth.middleware.js"
import { getComments, createComment, deleteComment } from "../controllers/comment.controller.js"

const routes = express.Router()

//public route
routes.get("/post/:postId", getComments)

//protected routes
routes.get('/post/:postId', protectRoute, createComment)
routes.delete('/:commentId', protectRoute, deleteComment)

export default routes