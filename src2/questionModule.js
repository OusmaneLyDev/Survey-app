const { client, db } = require("./config/database");

const collectionQuestion = db.collection("questions");

async function generateUniqueQuestionId() {
  const lastQuestion = await collectionQuestion
    .find({})
    .sort({ questionId: -1 })
    .limit(1)
    .project({ questionId: 1 })
    .toArray();
  return lastQuestion.length > 0 ? lastQuestion[0].questionId + 1 : 1;
}

async function addQuestion(document) {
  try {
    if (!document || typeof document !== 'object') {
      throw new Error('Document invalide');
    }

    document.questionId = await generateUniqueQuestionId();

    const existingQuestion = await collectionQuestion.findOne({ questionId: document.questionId });
    if (existingQuestion) {
      throw new Error(`Une question avec l'ID ${document.questionId} existe déjà.`);
    }

    await collectionQuestion.insertOne(document);
    console.log(`Le document ${document.questionId} a été ajouté avec succès.`);
  } catch (e) {
    console.error(`Erreur lors de l'ajout de la question: ${e.message}`);
  }
}

async function getQuestion() {
  try {
    const result = await collectionQuestion.find({}).toArray();
    console.log("Les résultats:", result);
  } catch (e) {
    console.error(`Erreur lors de la récupération des questions: ${e.message}`);
  }
}

async function updateQuestion(questionId, updateData) {
  try {
    const id = parseInt(questionId, 2);

    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const { _id, ...updateFields } = updateData;

    const result = await collectionQuestion.updateOne(
      { questionId: id },
      { $set: updateFields }
    );

    if (result.matchedCount > 0) {
      console.log(`Document ${id} est modifié avec succès.`);
    } else {
      console.log(`Erreur: Le document avec l'ID ${id} que vous tentez de modifier n'existe pas.`);
    }
  } catch (e) {
    console.error(`Erreur lors de la mise à jour de la question: ${e.message}`);
  }
}

async function destroyQuestion(questionId) {
  try {
    const id = parseInt(questionId, 10);

    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const result = await collectionQuestion.deleteOne({ questionId: id });

    if (result.deletedCount > 0) {
      console.log(`Document ${id} a été supprimé avec succès.`);
    } else {
      console.log(`Erreur: Le document avec l'ID ${id} que vous tentez de supprimer n'existe pas.`);
    }
  } catch (e) {
    console.error(`Erreur lors de la suppression de la question: ${e.message}`);
  }
}

module.exports = {
  addQuestion,
  getQuestion,
  updateQuestion,
  destroyQuestion,
};
