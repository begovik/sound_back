import Router from 'express'
import PostController from "../controllers/PostController.js";

const postRoutes = new Router()

postRoutes.post('/posts', PostController.create)
postRoutes.get('/posts', PostController.getAll)
postRoutes.get('/posts/:id', PostController.getOne)
postRoutes.put('/posts', PostController.update)
postRoutes.delete('/posts/:id', PostController.delete)

export default postRoutes