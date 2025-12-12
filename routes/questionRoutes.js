const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middleware/auth'); 
const { validateCreateQuestion } = require('../validators/questionValidator');

router.post('/', auth(['admin', 'profesor']), validateCreateQuestion, questionController.createQuestion);

router.get('/', auth(), questionController.getQuestions);

router.get('/history', auth(['estudiante']), questionController.getMyHistory);

router.post('/answer', auth(['estudiante', 'profesor', 'admin']), questionController.submitAnswer);

module.exports = router;