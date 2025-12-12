const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    scheduledFor: { type: Date },
    isActive: { type: Boolean, default: false }, 
    timeLimit: { type: Number, default: 30 }, 
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);