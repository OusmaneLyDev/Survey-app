db.reponses.find().pretty();
// src2/db.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'feedback_app';

const client = new MongoClient(url, { useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connecté à la base de données');
        return client.db(dbName);
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit(1);
    }
}

function close() {
    return client.close();
}

module.exports = { connect, close };
