const { MongoClient, ObjectId } = require('mongodb');

const mongoUri = 'mongodb://localhost:27017'; // URL de connexion à MongoDB
const dbName = 'feedback_app'; // Nom de la base de données

async function createSurvey(surveysCollection) {
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
    return await surveysCollection.insertOne(newSurvey);
}

async function createQuestion(questionsCollection) {
    const newQuestion = {
        questionText: "Quelle est la capitale de l'Espagne?",
        category: "Géographie",
        createdAt: new Date()
    };
    return await questionsCollection.insertOne(newQuestion);
}

async function createResponses(responsesCollection, questionId) {
    const newResponses = [
        {
            questionId,
            responseText: "Madrid",
            isCorrect: true,
            createdAt: new Date()
        },
        {
            questionId,
            responseText: "Barcelone",
            isCorrect: false,
            createdAt: new Date()
        }
    ];
    return await responsesCollection.insertMany(newResponses);
}

async function readResponses(responsesCollection, questionId) {
    return await responsesCollection.find({ questionId }).toArray();
}

async function updateResponse(responsesCollection, responseId) {
    return await responsesCollection.updateOne(
        { _id: responseId },
        { $set: { responseText: "Madrid - Espagne" } }
    );
}

async function deleteResponse(responsesCollection, responseId) {
    return await responsesCollection.deleteOne({ _id: responseId });
}

async function main() {
    const client = new MongoClient(mongoUri);
    try {
        await client.connect();
        console.log('Connecté à MongoDB');

        const db = client.db(dbName);
        
        const surveys = db.collection('surveys');
        const questions = db.collection('questions');
        const responses = db.collection('responses');

        const createSurveyResult = await createSurvey(surveys);
        console.log(`Nouvelle enquête créée avec l'ID : ${createSurveyResult.insertedId}`);

        const createQuestionResult = await createQuestion(questions);
        console.log(`Nouvelle question créée avec l'ID : ${createQuestionResult.insertedId}`);

        const createResponsesResult = await createResponses(responses, createQuestionResult.insertedId);
        const responseIds = Object.values(createResponsesResult.insertedIds).map(id => id.toString());
        console.log(`Nouvelles réponses créées avec les IDs : ${responseIds}`);

        const responsesList = await readResponses(responses, createQuestionResult.insertedId);
        console.log('Réponses récupérées pour la question:', responsesList);

        const updateResponseResult = await updateResponse(responses, createResponsesResult.insertedIds[0]);
        console.log(`Réponse mise à jour : ${updateResponseResult.modifiedCount}`);

        const deleteResponseResult = await deleteResponse(responses, createResponsesResult.insertedIds[1]);
        console.log(`Réponse supprimée : ${deleteResponseResult.deletedCount}`);
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await client.close();
        console.log('Connexion fermée.');
    }
}

main();
