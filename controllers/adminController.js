const Category = require('../models/Category');
const Question = require('../models/Question');

// Crear una Categoría
exports.createCategory = async (req, res) => {
    try {
        const { name, subcategories, description } = req.body;
        
        const category = new Category({ name, subcategories, description });
        await category.save();

        res.status(201).json({ msg: 'Categoría creada', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una Pregunta (Alternativa directa desde admin)
exports.createQuestion = async (req, res) => {
    try {
        const creatorId = req.user.id; 
        const { title, type, difficulty, categoryId, options } = req.body;

        const question = new Question({
            title,
            type,
            difficulty,
            category: categoryId,
            options,
            creator: creatorId
        });

        await question.save();
        res.status(201).json({ msg: 'Pregunta guardada correctamente', question });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las categorías (ESTA ES LA QUE FALTABA)
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};