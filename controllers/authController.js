const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const calculateAgeRange = (age) => {
    if (age >= 5 && age <= 12) return '5-12';
    if (age >= 13 && age <= 18) return '13-18';
    if (age >= 19 && age <= 26) return '19-26';
    if (age >= 27) return '27+';
    return null;
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, role, age } = req.body;
        
        const ageRange = calculateAgeRange(age);
        if (!ageRange) return res.status(400).json({ msg: 'Edad no válida (mínimo 5 años)' });

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username, email, password: hashedPassword, role, age, ageRange
        });

        await user.save();
        res.status(201).json({ msg: 'Usuario registrado', userId: user._id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};