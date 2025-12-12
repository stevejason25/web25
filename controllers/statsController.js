const User = require('../models/User');
const Question = require('../models/Question');
const Result = require('../models/Result');

exports.getAdminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'estudiante' });

        const totalQuestions = await Question.countDocuments();

        const results = await Result.find();
        const totalAttempts = results.length;
        
        let averageScore = 0;
        if (totalAttempts > 0) {
            const sumScores = results.reduce((acc, curr) => acc + curr.score, 0);
            averageScore = (sumScores / totalAttempts).toFixed(2); 
        }

        const topResult = await Result.findOne({ score: 100 })
            .populate('student', 'username email')
            .sort({ date: -1 });

        res.json({
            title: "📊 Reporte General del Sistema",
            metrics: {
                usuarios_totales: totalUsers,
                estudiantes_activos: totalStudents,
                banco_de_preguntas: totalQuestions,
                examenes_realizados: totalAttempts,
                promedio_global: `${averageScore}/100`
            },
            mejor_estudiante: topResult ? topResult.student.username : "Nadie ha sacado 100 aún"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generando reporte" });
    }
};