const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['seleccion_multiple', 'verdadero_falso', 'dinamica'], 
        required: true 
    },
    difficulty: { 
        type: String, 
        enum: ['facil', 'medio', 'dificil'], 
        required: true 
    },
    // --- NUEVO CAMPO: ETIQUETA DE EDAD ---
    ageRange: {
        type: String,
        enum: ['5-12', '13-18', '19-26', '27+'], // Debe coincidir con el usuario
        required: true
    },
    // -------------------------------------
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
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