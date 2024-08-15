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
    return surveysCollection.insertOne(newSurvey);
}

async function createQuestion(questionsCollection) {
    const newQuestion = {
        questionText: "Quelle est la capitale de l'Espagne?",
        category: "Géographie",
        createdAt: new Date()
    };
    return questionsCollection.insertOne(newQuestion);
}

async function createResponses(responsesCollection, questionId) {
    const newResponses = [
        {
            questionId: new ObjectId(questionId),
            responseText: "Madrid",
            isCorrect: true,
            createdAt: new Date()
        },
        {
            questionId: new ObjectId(questionId),
            responseText: "Barcelone",
            isCorrect: false,
            createdAt: new Date()
        }
    ];
    return responsesCollection.insertMany(newResponses);
}

async function readResponses(responsesCollection, questionId) {
    return responsesCollection.find({ questionId: new ObjectId(questionId) }).toArray();
}

async function updateResponse(responsesCollection, responseId) {
    return responsesCollection.updateOne(
        { _id: new ObjectId(responseId) },
        { $set: { responseText: "Madrid - Espagne" } }
    );
}

async function deleteResponse(responsesCollection, responseId) {
    return responsesCollection.deleteOne({ _id: new ObjectId(responseId) });
}

async function main() {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
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

        const updateResponseResult = await updateResponse(responses, responseIds[0]);
        console.log(`Réponse mise à jour : ${updateResponseResult.modifiedCount}`);

        const deleteResponseResult = await deleteResponse(responses, responseIds[1]);
        console.log(`Réponse supprimée : ${deleteResponseResult.deletedCount}`);
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await client.close();
        console.log('Connexion fermée.');
    }
}

main();
