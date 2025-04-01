import jwt from 'jsonwebtoken'
import TokenService from '../services/tokenService.js'
import UserRepository from '../repositories/userRepository.js'
import dotenv from 'dotenv'

dotenv.config() // De esta manera ya le decimos que se va a utilizar

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ message: 'No Autorizado' })
    }
    const token = authHeader.split(' ')[1]
    const userRepository = new UserRepository()
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const sessionToken = await userRepository.getSessionToken(decoded.id) // obtener el token que se guarios en la base de datos
        if (sessionToken != token || await TokenService.isTokenRevoked(token)) { // Comparara el token que llega con la base de datos y si no esta revocado
            return res.status(403).json({ message: 'Token Invalido o Expirado' })
        }
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Token Invalido' })
    }
}

export default authMiddleware