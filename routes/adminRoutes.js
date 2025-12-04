const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth'); 

// 1. Crear Categorías (Solo Admin)
router.post('/category', auth(['admin']), adminController.createCategory);

// 2. Crear Preguntas (Admin y Profe)
// Nota: Esta es una alternativa a la ruta de questionRoutes, ambas sirven.
router.post('/question', auth(['admin', 'profesor']), adminController.createQuestion);

// 3. Ver Categorías (Todos)
// IMPORTANTE: Aquí corregimos el error. Antes llamabas a getQuestions, ahora es getCategories
router.get('/categories', auth(['admin', 'profesor', 'estudiante']), adminController.getCategories);

module.exports = router;