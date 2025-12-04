const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'profesor', 'estudiante'], 
        default: 'estudiante' 
    },
    age: { type: Number, required: true },
    ageRange: { 
        type: String, 
        enum: ['5-12', '13-18', '19-26','27+'] 
    }
});

module.exports = mongoose.model('User', userSchema);