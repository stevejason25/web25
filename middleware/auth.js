const jwt = require('jsonwebtoken');

module.exports = function (rolesPermitidos = []) {
    return function (req, res, next) {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No hay token, permiso denegado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(req.user.role)) {
                return res.status(403).json({ msg: 'Acceso denegado: No tienes el rol necesario' });
            }

            next();
        } catch (error) {
            res.status(401).json({ msg: 'Token no es válido' });
        }
    };
};