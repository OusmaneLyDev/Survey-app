const { client, db } = require("./config/database");

const collectionSurvey = db.collection("surveys");

// Exemple de génération d'un ID basé sur l'_id de MongoDB
const generateId = () => {
  return new Date().getTime(); // Génère un ID unique basé sur le timestamp actuel
};

// Exemple de validation
const validateSurveyData = (data) => {
  if (!data.title || !data.description) {
    throw new Error('Title and description are required.');
  }
  // Ajoutez d'autres validations si nécessaire
};

// Exemple de vérification avant suppression
const deleteSurvey = async (id) => {
  const survey = await collectionSurvey.findOne({ surveyId: id });
  if (!survey) {
    throw new Error(`Survey with ID ${id} does not exist.`);
  }
  await collectionSurvey.deleteOne({ surveyId: id });
};

async function addSurvey(document) {
  try {
    if (!document || typeof document !== 'object') {
      throw new Error('Document invalide');
    }

    document.surveyId = generateId(); // Utilisation d'un ID unique

    // Vérifier l'unicité avant d'insérer
    const existingSurvey = await collectionSurvey.findOne({ surveyId: document.surveyId });
    if (existingSurvey) {
      throw new Error(`Un sondage avec l'ID ${document.surveyId} existe déjà.`);
    }

    await collectionSurvey.insertOne(document);
    console.log(`Le document ${document.surveyId} a été ajouté avec succès.`);
  } catch (e) {
    console.error(e.message);
  }
}

async function getSurvey(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;
    const result = await collectionSurvey.find({}).skip(skip).limit(limit).toArray();
    console.log("Les résultats:", result);
  } catch (e) {
    console.error(e.message);
  }
}

async function updateSurvey(surveyId, updateData) {
  try {
    const id = parseInt(surveyId, 10);

    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const { _id, ...updateFields } = updateData;

    const existingSurvey = await collectionSurvey.findOne({ surveyId: id });
    if (existingSurvey) {
      await collectionSurvey.updateOne(
        { surveyId: id },
        { $set: updateFields }
      );
      console.log(`Document ${id} est modifié avec succès.`);
    } else {
      console.log(`Erreur: Le document avec l'ID ${id} que vous tentez de modifier n'existe pas.`);
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function destroySurvey(surveyId) {
  try {
    const id = parseInt(surveyId, 10);

    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const existingSurvey = await collectionSurvey.findOne({ surveyId: id });
    if (existingSurvey) {
      await collectionSurvey.deleteOne({ surveyId: id });
      console.log(`Document ${id} a été supprimé avec succès.`);
    } else {
      console.log(`Erreur: Le document avec l'ID ${id} que vous tentez de supprimer n'existe pas.`);
    }
  } catch (e) {
    console.error(e.message);
  }
}

module.exports = {
  addSurvey,
  getSurvey,
  updateSurvey,
  destroySurvey,
};
