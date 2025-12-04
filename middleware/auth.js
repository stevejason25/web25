const jwt = require('jsonwebtoken');

module.exports = function (rolesPermitidos = []) {
    return function (req, res, next) {
        // 1. Leer el token del header
        const token = req.header('x-auth-token');

        // 2. Si no hay token, rechazar
        if (!token) {
            return res.status(401).json({ msg: 'No hay token, permiso denegado' });
        }

        try {
            // 3. Verificar token con la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Guardamos los datos del usuario

            // 4. Verificar Roles (Si la ruta exige roles específicos)
            if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(req.user.role)) {
                return res.status(403).json({ msg: 'Acceso denegado: No tienes el rol necesario' });
            }

            next(); // Todo correcto, continuar
        } catch (error) {
            res.status(401).json({ msg: 'Token no es válido' });
        }
    };
};