const { connectDB } = require('./config/db');

async function insertSurvey(survey) {
    const db = await connectDB();
    const collection = db.collection('surveys');

    try {
        const existingSurvey = await collection.findOne({ id: survey.id});
        if (existingSurvey) {
            console.log("Une enquête avec cet idSurvey existe déjà:");
            return;
        }

        // Insérer la nouvelle enquête
        await collection.insertOne(survey);
        // console.log("Enquête insérée avec succès:", survey);
        console.log("Enquête insérée avec succès:");

    } catch (err) {
        console.error("Erreur lors de l'insertion de l'enquête:", err);
    }
}

async function getAllSurveys() {
    const db = await connectDB();
    const collection = db.collection('surveys');

    try {
        const surveys = await collection.find({}).toArray();
        console.log("Liste des enquêtes:", surveys);

    } catch (err) {
        console.error("Erreur lors de la récupération des enquêtes:", err);
    }
}

async function getSurveyById(idSurvey) {
    const db = await connectDB();
    const collection = db.collection('surveys');

    try {
        const survey = await collection.findOne({ idSurvey: idSurvey });
        if (survey) {
            console.log("Enquête trouvée:", survey);
        } else {
            console.log("Aucune enquête trouvée pour l'idSurvey:", idSurvey);
        }

    } catch (err) {
        console.error("Erreur lors de la récupération de l'enquête:", err);
    }
}

async function updateSurvey(idSurvey, updatedData) {
    const db = await connectDB();
    const collection = db.collection('surveys');

    try {
        const result = await collection.updateOne(
            { idSurvey: idSurvey }, 
            { $set: updatedData }
        );

        if (result.matchedCount > 0) {
            console.log("Enquête mise à jour avec succès pour l'idSurvey:", idSurvey);
        } else {
            console.log("Aucune enquête trouvée pour l'idSurvey:", idSurvey);
        }

    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'enquête:", err);
    }
}

async function deleteSurvey(idSurvey) {
    const db = await connectDB();
    const collection = db.collection('surveys');

    try {
        const result = await collection.deleteOne({ idSurvey: idSurvey });

        if (result.deletedCount > 0) {
            console.log("Enquête supprimée avec succès pour l'idSurvey:", idSurvey);
        } else {
            console.log("Aucune enquête trouvée pour l'idSurvey:", idSurvey);
        }

    } catch (err) {
        console.error("Erreur lors de la suppression de l'enquête:", err);
    }
  
}

// Export des fonctions pour les utiliser dans d'autres fichiers
module.exports = {
    insertSurvey,
    getAllSurveys,
    getSurveyById,
    updateSurvey,
    deleteSurvey
};