import Router from 'express'
import UserController from "../controllers/UserController.js"

const userRoutes = new Router()

userRoutes.post('/user', UserController.createUser)
userRoutes.get('/user', UserController.getUsers)
userRoutes.get('/user/:id', UserController.getOneUser)
userRoutes.put('/user', UserController.updateUser)
userRoutes.delete('/user/:id', UserController.deleteUser)
userRoutes.delete('/delete_all_users', UserController.deleteAllUsers)

export default userRoutes