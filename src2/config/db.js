const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'feedback-app';

let db = null;

async function connectDB() {
    if (db) {
        return db;
    }

    const client = new MongoClient(url);
    try {
        await client.connect();
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données:", error);
        throw error;
    }
}

module.exports = { connectDB };