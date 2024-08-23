const { connectDB, getDB } = require('./config/db');

const { insertSurvey, getAllSurveys, getSurveyById, updateSurvey, deleteSurvey } = require('./surveyModule');
const { createAnswer, readAllAnswers, readAnswerById, updateAnswer, deleteAnswer } = require('./answerModule');
const { createQuestion, readAllQuestions, readQuestionById, updateQuestion, deleteQuestion } = require('./questionModule');

// Connexion à la base de données
connectDB().then(async () => {
    // Gestion des enquêtes
    await insertSurvey({
        idSurvey: 4,  // Changement d'ID pour éviter les conflits
        name: "Enquête de Satisfaction 002",
        description: "Deuxième enquête visant à évaluer la satisfaction des clients.",
        createdAt: "2024-08-13T10:00:00Z",
        createdBy: {
            employeeName: "Sid'Ahmed",
            employeeRole: "Gestionnaire"
        }
    });

    await getAllSurveys();
    await getSurveyById(1);
    await updateSurvey(1, { 
        name: "Enquête de Satisfaction 002 - Mise à jour", 
        description: "Mise à jour de project.",
        createdAt: "2024-08-13T10:00:00Z",
        createdBy: {
            employeeName: "Abdoul Ba",
            employeeRole: "Gestionnaire"
        }
    });
    await deleteSurvey(2);
    await getAllSurveys();

    // Gestion des questions
    await createQuestion(4, "Quelle est votre satisfaction globale ?", "rating", { minValue: 1, maxValue: 10, step: 1 }); // ID corrigé
    await readAllQuestions();
    await readQuestionById(4);
    await updateQuestion(4, { title: "Comment évalueriez-vous notre service ? (Mise à jour)" }); // ID corrigé
    await deleteQuestion(4);
    await readAllQuestions();

    // Gestion des réponses
    await createAnswer(11, 1, [  // ID corrigé
        { title: "Très bien" }
    ]);
    await readAllAnswers();
    await readAnswerById(1);
    await updateAnswer(1, { options: [{ title: "Extrêmement satisfait" }] });
    await deleteAnswer(1);
    await readAllAnswers();
}).catch(err => {
    console.error("Erreur lors de la connexion à la base de données :", err.message);
});
