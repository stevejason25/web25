const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['seleccion_multiple', 'verdadero_falso', 'respuesta_corta', 'dinamica', 'interactiva'], 
        default: 'seleccion_multiple',
        required: true 
    },
    status: {
        type: String,
        enum: ['borrador', 'publicado', 'archivo'],
        default: 'borrador'
    },
    explanation: { type: String }, 
    multimediaURL: { type: String },
    difficulty: { 
        type: String, 
        enum: ['facil', 'media', 'dificil'], 
        required: true 
    },
    ageRange: {
        type: String,
        enum: ['5-12', '13-18', '19-26', '27+'],
        required: true
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    subcategory: { type: String },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);