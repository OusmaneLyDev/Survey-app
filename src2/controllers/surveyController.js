const { getDb } = require('../config/db');

const addSurvey = async (survey) => {
  try {
    const db = await getDb();
    await db.collection('surveys').insertOne(survey);
    console.log('Enquête ajoutée avec succès');
  } catch (e) {
    console.error(`Erreur lors de l'ajout de l'enquête: ${e.message}`);
  }
};

const getSurvey = async () => {
  try {
    const db = await getDb();
    const surveys = await db.collection('surveys').find().toArray();
    console.log('Enquêtes récupérées avec succès:', surveys);
  } catch (e) {
    console.error(`Erreur lors de la récupération des enquêtes: ${e.message}`);
  }
};

const updateSurvey = async (id, survey) => {
  try {
    const db = await getDb();
    await db.collection('surveys').updateOne({ _id: id }, { $set: survey });
    console.log('Enquête mise à jour avec succès');
  } catch (e) {
    console.error(`Erreur lors de la mise à jour de l'enquête avec l'ID ${id}: ${e.message}`);
  }
};

const destroySurvey = async (id) => {
  try {
    const db = await getDb();
    await db.collection('surveys').deleteOne({ _id: id });
    console.log('Enquête supprimée avec succès');
  } catch (e) {
    console.error(`Erreur lors de la suppression de l'enquête avec l'ID ${id}: ${e.message}`);
  }
};

module.exports = {
  addSurvey,
  getSurvey,
  updateSurvey,
  destroySurvey,
};
