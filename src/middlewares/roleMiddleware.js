export function roleMiddleware(...allowedRoles) { // Como van a llegar varioa arreglos de esta manera voy a tener los roles que se van a permitir
    return (req, res, next) => {
        const { rol } = req.user
        if (!allowedRoles.includes(rol)) {
            return res.status(400).json({ 
                message: 'No tienes permisos para realizar la operacion' 
            })
        }
        next()
    }
}