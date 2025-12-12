const { check, validationResult } = require('express-validator');

exports.validateCreateQuestion = [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('type', 'El tipo de pregunta no es válido').isIn(['seleccion_multiple', 'verdadero_falso', 'respuesta_corta', 'dinamica', 'interactiva']),
    check('difficulty', 'La dificultad debe ser facil, media o dificil').isIn(['facil', 'media', 'dificil']),
    check('ageRange', 'El rango de edad es obligatorio').not().isEmpty(),
    check('category', 'La categoría es obligatoria').isMongoId(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];