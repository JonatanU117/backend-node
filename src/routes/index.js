import express from 'express'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {  // Si llega a raiz da este mensaje
    res.json({ message: 'Servidor de API '})
})

router.use('/users', userRoutes) // todo lo que es de usuario aqui viene

export default router