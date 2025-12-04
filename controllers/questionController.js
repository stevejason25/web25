const Question = require('../models/Question');
const User = require('../models/User'); // Necesario para buscar al usuario

// Crear una pregunta nueva
exports.createQuestion = async (req, res) => {
    try {
        // Validar permisos (Solo Admin o Profesor)
        if (req.user.role === 'estudiante') {
            return res.status(403).json({ msg: 'No tienes permisos para crear preguntas' });
        }

        const question = new Question({
            ...req.body,
            creator: req.user.id,
            // Si mandan subcategoría, la guardamos
            subcategory: req.body.subcategory 
        });

        await question.save();
        res.status(201).json({ msg: 'Pregunta creada', question });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener preguntas (FILTRADAS POR EDAD)
exports.getQuestions = async (req, res) => {
    try {
        const { difficulty, category } = req.query;
        let query = {};

        // 1. Filtrar por el rango de edad
        if (req.user.role === 'estudiante') {
             const currentUser = await User.findById(req.user.id);
             query.ageRange = currentUser.ageRange; 
        } else {
            // Profesores ven todo o filtran si quieren
            if (req.query.ageRange) query.ageRange = req.query.ageRange;
        }

        // 2. Filtros opcionales
        if (difficulty) query.difficulty = difficulty;
        if (category) query.category = category;

        const questions = await Question.find(query).populate('category', 'name');
        
        if (questions.length === 0) {
            return res.json({ msg: "No hay preguntas disponibles para tu rango de edad.", questions: [] });
        }

        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// FUNCION: Responder una pregunta (ESTA ERA LA QUE FALTABA)
exports.submitAnswer = async (req, res) => {
    try {
        const { questionId, selectedOptionId } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ msg: 'Pregunta no encontrada' });
        }

        const option = question.options.id(selectedOptionId);
        
        if (!option) {
            return res.status(400).json({ msg: 'Opción no válida' });
        }

        if (option.isCorrect) {
            return res.json({ 
                msg: '¡Correcto! 🎉', 
                correct: true,
                feedback: 'Excelente trabajo.'
            });
        } else {
            return res.json({ 
                msg: 'Incorrecto 😢', 
                correct: false, 
                feedback: 'Sigue intentando.'
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};