import Router from 'express'
import LoginController from "../controllers/LoginController.js";
import {body} from "express-validator"

const loginRoutes = new Router()

loginRoutes.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    LoginController.registration)
loginRoutes.get('/activate/:link', LoginController.activate)
loginRoutes.post('/login', LoginController.login)
loginRoutes.post('/logout', LoginController.logout)
loginRoutes.get('/refresh', LoginController.refresh)
// loginRoutes.get('/users')

export default loginRoutes