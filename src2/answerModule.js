const { connectDB } = require('./config/db');

// Fonction pour créer une nouvelle réponse
async function createAnswer(idAnswer, questionId, options) {
    try {
        const db = await connectDB();

        // Vérifier si l'ID de la réponse existe déjà
        const existingAnswer = await db.collection('answers').findOne({ idAnswer });
        if (existingAnswer) {
            console.log(`Une réponse avec l'ID ${idAnswer} existe déjà.`);
            return;
        }

        const newAnswer = {
            idAnswer,
            questionId,
            options
        };
        await db.collection('answers').insertOne(newAnswer);
        console.log("Réponse créée avec succès:", newAnswer);
    } catch (err) {
        console.error("Erreur lors de la création de la réponse:", err);
    }
}

// Fonction pour lire toutes les réponses
async function readAllAnswers() {
    try {
        const db = await connectDB();
        const answers = await db.collection('answers').find().toArray();
        console.log("Liste des réponses:", answers);
    } catch (err) {
        console.error("Erreur lors de la récupération des réponses:", err);
    }
}

// Fonction pour lire une réponse par son ID
async function readAnswerById(idAnswer) {
    try {
        const db = await connectDB();
        const answer = await db.collection('answers').findOne({ idAnswer });
        if (answer) {
            console.log("Réponse trouvée:", answer);
        } else {
            console.log("Réponse non trouvée pour l'ID:", idAnswer);
        }
    } catch (err) {
        console.error("Erreur lors de la récupération de la réponse:", err);
    }
}

// Fonction pour mettre à jour une réponse
async function updateAnswer(idAnswer, updatedData) {
    try {
        const db = await connectDB();

        // Vérifier si l'ID de la réponse existe
        const existingAnswer = await db.collection('answers').findOne({ idAnswer });
        if (!existingAnswer) {
            console.log(`Aucune réponse trouvée avec l'ID ${idAnswer}.`);
            return;
        }

        const result = await db.collection('answers').updateOne(
            { idAnswer },
            { $set: updatedData }
        );
        if (result.matchedCount > 0) {
            console.log("Réponse mise à jour avec succès:", updatedData);
        } else {
            console.log("Réponse non trouvée pour l'ID:", idAnswer);
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la réponse:", err);
    }
}

// Fonction pour supprimer une réponse
async function deleteAnswer(idAnswer) {
    try {
        const db = await connectDB();

        // Vérifier si l'ID de la réponse existe
        const existingAnswer = await db.collection('answers').findOne({ idAnswer });
        if (!existingAnswer) {
            console.log(`Aucune réponse trouvée avec l'ID ${idAnswer}.`);
            return;
        }

        const result = await db.collection('answers').deleteOne({ idAnswer });
        if (result.deletedCount > 0) {
            console.log("Réponse supprimée avec succès pour l'ID:", idAnswer);
        } else {
            console.log("Réponse non trouvée pour l'ID:", idAnswer);
        }
    } catch (err) {
        console.error("Erreur lors de la suppression de la réponse:", err);
    }
}

// Exporter les fonctions pour les utiliser dans d'autres fichiers
module.exports = {
    createAnswer,
    readAllAnswers,
    readAnswerById,
    updateAnswer,
    deleteAnswer
};