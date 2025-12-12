const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: false }, 
    
    score: { type: Number, required: true }, 
    totalQuestions: { type: Number, required: true },
    answers: [ 
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            selectedOption: String,
            isCorrect: Boolean
        }
    ],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);