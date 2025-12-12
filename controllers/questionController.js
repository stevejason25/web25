const Question = require('../models/Question');
const User = require('../models/User');
const Result = require('../models/Result'); 

exports.createQuestion = async (req, res) => {
    try {
        if (req.user.role === 'estudiante') {
            return res.status(403).json({ msg: 'No tienes permisos para crear preguntas' });
        }

        const question = new Question({
            ...req.body,
            creator: req.user.id
        });

        await question.save();
        res.status(201).json({ msg: 'Pregunta creada', question });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getQuestions = async (req, res) => {
    try {
        const { difficulty, category } = req.query;
        let query = {};
        if (req.user.role === 'estudiante') {
             const currentUser = await User.findById(req.user.id);
             if (currentUser.ageRange) {
                 query.ageRange = currentUser.ageRange; 
             }
        } else {
            if (req.query.ageRange) query.ageRange = req.query.ageRange;
        }

        if (difficulty) query.difficulty = difficulty;
        if (category) query.category = category;

        const questions = await Question.find(query)
            .populate('category', 'name')
            .select('-options.isCorrect'); 
        
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.submitAnswer = async (req, res) => {
    try {
        const { questionId, selectedOptionId } = req.body;
        const studentId = req.user.id;
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ msg: 'Pregunta no encontrada' });

        const option = question.options.id(selectedOptionId);
        if (!option) return res.status(400).json({ msg: 'Opción no válida' });

        const isCorrect = option.isCorrect;

        const newResult = new Result({
            student: studentId,
            score: isCorrect ? 100 : 0, 
            totalQuestions: 1,
            answers: [{
                questionId: question._id,
                selectedOption: option.text,
                isCorrect: isCorrect
            }]
        });

        await newResult.save();
        return res.json({ 
            msg: isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😢', 
            correct: isCorrect,
            feedback: question.explanation || (isCorrect ? 'Muy bien hecho.' : 'Repasa el tema.'),
            multimedia: question.multimediaURL 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
exports.getMyHistory = async (req, res) => {
    try {
        const results = await Result.find({ student: req.user.id })
            .sort({ date: -1 }); 
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};