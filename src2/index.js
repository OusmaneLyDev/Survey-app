const {
  addSurvey,
  getSurvey,
  updateSurvey,
  destroySurvey,
} = require("./surveyModule");
const {
  addAnswer,
  getAnswer,
  updateAnswer,
  destroyAnswer,
} = require("./answerModule");
const {
  addQuestion,
  getQuestion,
  updateQuestion,
  destroyQuestion,
} = require("./questionModule");
const { client } = require("./config/database");

// Fonction pour générer le prochain ID disponible
async function generateNewId(entity, getMethod) {
  const entities = await getMethod();
  if (!entities || entities.length === 0) return 1; // Vérifie si le résultat est `undefined` ou un tableau vide
  const ids = entities.map((e) => e[`${entity}Id`]);
  return Math.max(...ids) + 1;
}

async function main() {
  try {
    // Génération des nouveaux IDs pour chaque entité
    const newSurveyId = await generateNewId("survey", getSurvey);
    const newQuestionId = await generateNewId("question", getQuestion);
    const newAnswerId = await generateNewId("answer", getAnswer);

    // Mise à jour des objets avec les nouveaux IDs
    const survey = {
      surveyId: newSurveyId,
      name: "Enquête de Satisfaction 1",
      description:
        "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
      createdAt: "2024-07-25T08:00:00Z",
      createdBy: {
        employeeName: "Jane Smith",
        employeeRole: "Responsable du service client",
      },
    };

    const question = {
      questionId: newQuestionId,
      surveyId: newSurveyId,
      title: "Comment évalueriez-vous notre service ?",
      type: "rating",
      option: 1,
    };

    const answer = {
      answerId: newAnswerId,
      questionId: newQuestionId,
      title: "Très satisfait",
    };

    // Opérations CRUD
    await addSurvey(survey);
    await getSurvey();
    await updateSurvey(newSurveyId, survey);
    await destroySurvey(newSurveyId);

    await addAnswer(answer);
    await updateAnswer(newAnswerId, answer);
    await getAnswer();
    await destroyAnswer(newAnswerId);

    await addQuestion(question);
    await getQuestion();
    await updateQuestion(newQuestionId, question);
    await destroyQuestion(newQuestionId);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main();
