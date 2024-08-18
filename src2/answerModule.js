const { client, db } = require("./config/database");

const collectionAnswer = db.collection("answers");

async function generateUniqueAnswerId() {
  const lastAnswer = await collectionAnswer
    .find({})
    .sort({ answerId: -1 })
    .limit(1)
    .project({ answerId: 1 })
    .toArray();
  return lastAnswer.length > 0 ? lastAnswer[0].answerId + 1 : 1;
}

async function addAnswer(document) {
  try {
    if (!document || typeof document !== 'object') {
      throw new Error('Document invalide');
    }

    document.answerId = await generateUniqueAnswerId();

    const existingAnswer = await collectionAnswer.findOne({ answerId: document.answerId });
    if (existingAnswer) {
      throw new Error(`Une réponse avec l'ID ${document.answerId} existe déjà.`);
    }

    await collectionAnswer.insertOne(document);
    console.log(`Le document ${document.answerId} a été ajouté avec succès.`);
  } catch (e) {
    console.error(`Erreur lors de l'ajout de la réponse: ${e.message}`);
  }
}

async function getAnswer() {
  try {
    const result = await collectionAnswer.find({}).toArray();
    console.log("Les résultats:", result);
  } catch (e) {
    console.error(`Erreur lors de la récupération des réponses: ${e.message}`);
  }
}

async function updateAnswer(answerId, updateData) {
  try {
    const id = parseInt(answerId, 10);

    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const { _id, ...updateFields } = updateData;

    const result = await collectionAnswer.updateOne(
      { answerId: id },
      { $set: updateFields }
    );

    if (result.matchedCount > 0) {
      console.log(`Document ${id} est modifié avec succès.`);
    } else {
      console.log(`Erreur: Le document avec l'ID ${id} que vous tentez de modifier n'existe pas.`);
    }
  } catch (e) {
    console.error(`Erreur lors de la mise à jour de la réponse: ${e.message}`);
  }
}

async function destroyAnswer(answerId) {
  try {
    const id = parseInt(answerId, 10);

    if (isNaN(id)) {
      throw new Error('ID invalide');
    }

    const result = await collectionAnswer.deleteOne({ answerId: id });

    if (result.deletedCount > 0) {
      console.log(`Document ${id} a été supprimé avec succès.`);
    } else {
      console.log(`Erreur: Le document avec l'ID ${id} que vous tentez de supprimer n'existe pas.`);
    }
  } catch (e) {
    console.error(`Erreur lors de la suppression de la réponse: ${e.message}`);
  }
}

module.exports = {
  addAnswer,
  getAnswer,
  updateAnswer,
  destroyAnswer,
};
