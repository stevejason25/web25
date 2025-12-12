const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 
const Category = require('./models/Category'); 
const Question = require('./models/Question'); 
const hashedPassword = await bcrypt.hash('123', salt);

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🍃 MongoDB Conectado para Seeding...');

        await User.deleteMany();
        await Category.deleteMany();
        await Question.deleteMany();
        console.log('🗑️  Base de datos limpiada.');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123', salt);

        const admin = await User.create({
            username: 'Super Admin',
            email: 'admin@test.com',
            password: hashedPassword,
            role: 'admin',
            age: 30
        });

        const profesor = await User.create({
            username: 'Profe Juan',
            email: 'profe@test.com',
            password: hashedPassword,
            role: 'profesor',
            age: 40
        });

        const estudiante = await User.create({
            username: 'Pepito',
            email: 'pepito@test.com',
            password: hashedPassword,
            role: 'estudiante',
            ageRange: '5-12',
            age: 10 
        });
        
        console.log('👥 Usuarios creados: Admin, Profe, Pepito (Pass: 123)');

        const matematicas = await Category.create({
            name: 'Matemáticas',
            subcategories: ['Aritmética', 'Geometría'],
            description: 'Ciencias exactas',
            creator: admin._id 
        });
        console.log('📚 Categoría Matemáticas creada.');

        await Question.create({
            title: '¿Cuánto es 5 + 5?',
            type: 'seleccion_multiple',
            difficulty: 'facil',
            ageRange: '5-12', 
            category: matematicas._id,
            creator: profesor._id,
            options: [
                { text: '10', isCorrect: true },
                { text: '8', isCorrect: false },
                { text: '55', isCorrect: false }
            ]
        });
        console.log('❓ Pregunta creada.');

        console.log('✅ ¡SEED TERMINADO! Base de datos lista para pruebas.');
        process.exit();
    } catch (error) {
        console.error('❌ Error en el Seed:', error);
        process.exit(1);
    }
};

seedDB();