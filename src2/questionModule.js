const { connectDB } = require('./config/db');

// Fonction pour créer une question
async function createQuestion(idQuestion, surveyId, questionText, options) {
    try {
        const db = await connectDB();

        // Vérification que l'ID de la question n'existe pas déjà
        const existingQuestion = await db.collection('questions').findOne({ idQuestion });
        if (existingQuestion) {
            console.log(`Une question avec l'ID ${idQuestion} existe déjà.`);
            return;
        }

        // Vérification que le tableau options existe et n'est pas vide
        if (!options || options.length === 0) {
            console.log("Les options doivent être fournies et ne peuvent pas être vides.");
            return;
        }

        const newQuestion = {
            idQuestion,
            surveyId,
            questionText,
            options
        };
        await db.collection('questions').insertOne(newQuestion);
        console.log("Question créée avec succès:", newQuestion);
    } catch (err) {
        console.error("Erreur lors de la création de la question:", err);
    }
}
// Fonction pour lire toutes les questions
async function readAllQuestions() {
    try {
        const db = await connectDB();
        const questions = await db.collection('questions').find().toArray();
        console.log("Liste des questions:", questions);
    } catch (err) {
        console.error("Erreur lors de la récupération des questions:", err);
    }
}

// Fonction pour lire une question par ID
async function readQuestionById(idQuestion) {
    try {
        const db = await connectDB();
        const question = await db.collection('questions').findOne({ idQuestion });
        if (question) {
            console.log("Question trouvée:", question);
        } else {
            console.log("Question non trouvée pour l'ID:", idQuestion);
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de la question:", err);
    }
}

// Fonction pour mettre à jour une question
async function updateQuestion(idQuestion, updatedData) {
    try {
        const db = await connectDB();

        // Vérifier si l'ID de la question existe
        const existingQuestion = await db.collection('questions').findOne({ idQuestion });
        if (!existingQuestion) {
            console.log(`Aucune question trouvée avec l'ID ${idQuestion}.`);
            return;
        }

        const result = await db.collection('questions').updateOne({ idQuestion }, { $set: updatedData });
        if (result.matchedCount > 0) {
            console.log("Question mise à jour avec succès");
        } else {
            console.log("Question non trouvée pour l'ID:", idQuestion);
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la question:", err);
    }
}

// Fonction pour supprimer une question
async function deleteQuestion(idQuestion) {
    try {
        const db = await connectDB();

        // Vérifier si l'ID de la question existe
        const existingQuestion = await db.collection('questions').findOne({ idQuestion });
        if (!existingQuestion) {
            console.log(`Aucune question trouvée avec l'ID ${idQuestion}.`);
            return;
        }

        const result = await db.collection('questions').deleteOne({ idQuestion });
        if (result.deletedCount > 0) {
            console.log("Question supprimée avec succès");
        } else {
            console.log("Aucune question trouvée pour l'ID:", idQuestion);
        }
    } catch (err) {
        console.error("Erreur lors de la suppression de la question:", err);
    }
}

module.exports = { createQuestion, readAllQuestions, readQuestionById, updateQuestion, deleteQuestion };