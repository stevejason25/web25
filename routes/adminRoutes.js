const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const statsController = require('../controllers/statsController');
const auth = require('../middleware/auth'); 

router.post('/category', auth(['admin']), adminController.createCategory);

router.post('/question', auth(['admin', 'profesor']), adminController.createQuestion);

router.get('/categories', auth(['admin', 'profesor', 'estudiante']), adminController.getCategories);

module.exports = router;