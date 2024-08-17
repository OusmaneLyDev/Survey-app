const { getDb } = require('../config/db');

const addAnswer = async (answer) => {
  try {
    const db = await getDb();
    await db.collection('answers').insertOne(answer);
    console.log('Réponse ajoutée avec succès');
  } catch (e) {
    console.error(`Erreur lors de l'ajout de la réponse: ${e.message}`);
  }
};

const getAnswer = async () => {
  try {
    const db = await getDb();
    const answers = await db.collection('answers').find().toArray();
    console.log('Réponses récupérées avec succès:', answers);
  } catch (e) {
    console.error(`Erreur lors de la récupération des réponses: ${e.message}`);
  }
};

const updateAnswer = async (id, answer) => {
  try {
    const db = await getDb();
    await db.collection('answers').updateOne({ _id: id }, { $set: answer });
    console.log('Réponse mise à jour avec succès');
  } catch (e) {
    console.error(`Erreur lors de la mise à jour de la réponse avec l'ID ${id}: ${e.message}`);
  }
};

const destroyAnswer = async (id) => {
  try {
    const db = await getDb();
    await db.collection('answers').deleteOne({ _id: id });
    console.log('Réponse supprimée avec succès');
  } catch (e) {
    console.error(`Erreur lors de la suppression de la réponse avec l'ID ${id}: ${e.message}`);
  }
};

module.exports = {
  addAnswer,
  getAnswer,
  updateAnswer,
  destroyAnswer,
};
