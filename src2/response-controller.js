const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // URL de connexion à MongoDB
const dbName = 'feedback_app'; // Nom de la base de données

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect(); // Connexion au client MongoDB
        console.log('Connecté à MongoDB');

        const db = client.db(dbName); // Accéder à la base de données
        const surveys = db.collection('surveys'); // Accéder à la collection "surveys"
        const questions = db.collection('questions'); // Accéder à la collection "questions"
        const reponses = db.collection('reponses'); // Accéder à la collection "reponses"

        // Création d'une nouvelle enquête
        const newSurvey = {
            name: "Nouvelle enquête",
            description: "Enquête pour mesurer la satisfaction client.",
            createdAt: new Date(),
            createdBy: {
                employeeName: "John Doe",
                employeeRole: "Responsable"
            },
            questions: [
                {
                    title: "Comment évalueriez-vous notre service globalement?",
                    type: "rating",
                    options: {
                        minValue: 1,
                        maxValue: 5,
                        step: 1
                    },
                    answers: [
                        { title: "Excellent" },
                        { title: "Bon" },
                        { title: "Moyen" },
                        { title: "Mauvais" },
                        { title: "Très mauvais" }
                    ]
                }
            ]
        };

        // Création d'une enquête
        const createSurveyResult = await surveys.insertOne(newSurvey);
        console.log(`Nouvelle enquête créée avec l'ID : ${createSurveyResult.insertedId}`);

        // Lecture d'une enquête spécifique
        const survey = await surveys.findOne({ _id: createSurveyResult.insertedId });
        console.log('Enquête récupérée:', survey);

        // Mise à jour de l'enquête
        const updateSurveyResult = await surveys.updateOne(
            { _id: createSurveyResult.insertedId },
            { $set: { description: "Enquête pour mesurer la satisfaction client (mise à jour)." } }
        );
        console.log(`Enquêtes mises à jour : ${updateSurveyResult.modifiedCount}`);

        // Suppression de l'enquête
        const deleteSurveyResult = await surveys.deleteOne({ _id: createSurveyResult.insertedId });
        console.log(`Enquêtes supprimées : ${deleteSurveyResult.deletedCount}`);

        // Création d'une nouvelle question
        const newQuestion = {
            questionText: "Quelle est la capitale de l'Espagne?",
            category: "Géographie",
            createdAt: new Date()
        };

        // Création d'une question
        const createQuestionResult = await questions.insertOne(newQuestion);
        console.log(`Nouvelle question créée avec l'ID : ${createQuestionResult.insertedId}`);

        // Lecture d'une question spécifique
        const question = await questions.findOne({ _id: createQuestionResult.insertedId });
        console.log('Question récupérée:', question);

        // Mise à jour de la question
        const updateQuestionResult = await questions.updateOne(
            { _id: createQuestionResult.insertedId },
            { $set: { questionText: "Quelle est la capitale de la France?" } }
        );
        console.log(`Questions mises à jour : ${updateQuestionResult.modifiedCount}`);

        // Suppression de la question
        const deleteQuestionResult = await questions.deleteOne({ _id: createQuestionResult.insertedId });
        console.log(`Questions supprimées : ${deleteQuestionResult.deletedCount}`);

        // Création de nouvelles réponses
        const newReponses = [
            {
                questionId: createQuestionResult.insertedId,
                reponseText: "Madrid",
                isCorrect: true,
                createdAt: new Date()
            },
            {
                questionId: createQuestionResult.insertedId,
                reponseText: "Barcelone",
                isCorrect: false,
                createdAt: new Date()
            }
        ];

        // Création de réponses
        const createReponsesResult = await reponses.insertMany(newReponses);
        console.log(`Nouvelles réponses créées avec les IDs : ${createReponsesResult.insertedIds}`);

    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await client.close(); // Fermeture de la connexion
        console.log('Connexion fermée.');
    }
}

main();
