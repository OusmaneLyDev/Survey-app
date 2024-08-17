const { getDb } = require('../config/db');

const addQuestion = async (question) => {
  try {
    const db = await getDb();
    await db.collection('questions').insertOne(question);
    console.log('Question ajoutée avec succès');
  } catch (e) {
    console.error(`Erreur lors de l'ajout de la question: ${e.message}`);
  }
};

const getQuestion = async () => {
  try {
    const db = await getDb();
    const questions = await db.collection('questions').find().toArray();
    console.log('Questions récupérées avec succès:', questions);
  } catch (e) {
    console.error(`Erreur lors de la récupération des questions: ${e.message}`);
  }
};

const updateQuestion = async (id, question) => {
  try {
    const db = await getDb();
    await db.collection('questions').updateOne({ _id: id }, { $set: question });
    console.log('Question mise à jour avec succès');
  } catch (e) {
    console.error(`Erreur lors de la mise à jour de la question avec l'ID ${id}: ${e.message}`);
  }
};

const destroyQuestion = async (id) => {
  try {
    const db = await getDb();
    await db.collection('questions').deleteOne({ _id: id });
    console.log('Question supprimée avec succès');
  } catch (e) {
    console.error(`Erreur lors de la suppression de la question avec l'ID ${id}: ${e.message}`);
  }
};

module.exports = {
  addQuestion,
  getQuestion,
  updateQuestion,
  destroyQuestion,
};
