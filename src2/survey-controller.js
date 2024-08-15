// createSurvey.js
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'feedback_app';

async function createSurvey() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const surveys = db.collection('surveys');
        const result = await surveys.insertOne({
            _id: 1,
            name: 'Enquête de Satisfaction',
            description: 'Évaluez votre satisfaction.',
            createdAt: new Date(),
            createdBy: { employeeName: 'John Doe', employeeRole: 'Responsable' },
            questions: [
                {
                    title: 'Comment évalueriez-vous notre service?',
                    type: 'rating',
                    options: { minValue: 1, maxValue: 5, step: 1 },
                    answers: [
                        { title: 'Excellent' },
                        { title: 'Bon' },
                        { title: 'Moyen' },
                        { title: 'Mauvais' },
                        { title: 'Très mauvais' }
                    ]
                }
            ]
        });
        console.log('Enquête insérée:', result.insertedId);
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'enquête:', error);
    } finally {
        await client.close();
    }
}

createSurvey();
