import express from 'express'
import UserController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const userController = new UserController()

const userRoutes = [
    {
        method: 'get',
        path: '/',
        middleware: [authMiddleware, roleMiddleware('admin')], //verifica que este accesdio y qeu el admin solo pueda acceder a la funcion
        handler: 'getAll'
    },
    {
        method: 'get',
        path: '/by-user/:usuario',
        middleware: [authMiddleware, roleMiddleware('admin')],
        handler: 'getByUser'
    },
    {
        method: 'get',
        path: '/by-rol/:rol',
        middleware: [authMiddleware, roleMiddleware('admin')],
        handler: 'getByRol'
    },
    {
        method: 'post',
        path: '/create',
        // middleware: [authMiddleware, rolMiddleware('admin')],
        handler: 'create'
    },
    {
        method: 'put',
        path: '/update/:id',
        middleware: [authMiddleware, roleMiddleware('admin')],
        handler: 'update'
    },
    {
        method: 'delete',
        path: '/delete/:id',
        middleware: [authMiddleware, roleMiddleware('admin')], // Si quisieramos que otra funcion haga esto es poneral aqui
        handler: 'delete'
    },
    {
        method: 'post',
        path: '/login',
        handler: 'login'
    },
    {
        method: 'post',
        path: '/logout',
        middleware: [authMiddleware], // necesita el middleware para compara el token
        handler: 'logout'
    },
    {
        method: 'post',
        path: '/unlock/:id',
        middleware: [authMiddleware, roleMiddleware('admin')],
        handler: 'unlockUser'
    },
    {
        method: 'get',
        path: '/user',
        middleware: [authMiddleware],
        handler: 'getUserByUsername'
    }
]

userRoutes.forEach(route => { // Como es un arreglo lo voy a recorrer
    router[route.method](
        route.path,
        ...(route.middleware || []), // Si no hay middleware pondra un arreglo vacio
        userController[route.handler].bind(userController)
    )
})

export default router