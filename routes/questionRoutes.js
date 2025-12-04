const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middleware/auth'); 

// OJO AQUÍ: Agregamos ['admin', 'profesor'] para proteger la creación
router.post('/', auth(['admin', 'profesor']), questionController.createQuestion);

// Aquí ponemos auth() vacío, significa "cualquier usuario logueado" puede verlas
router.get('/', auth(), questionController.getQuestions);
router.post('/answer', auth(['estudiante', 'profesor', 'admin']), questionController.submitAnswer);

module.exports = router;