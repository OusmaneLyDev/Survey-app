const { addSurvey, getSurvey, updateSurvey, destroySurvey } = require("./surveyModule");
const { addAnswer, getAnswer, updateAnswer, destroyAnswer } = require("./answerModule");
const { addQuestion, getQuestion, updateQuestion, destroyQuestion } = require("./questionModule");
const { client } = require("./config/database");

const question = {
  questionId: 1,
  surveyId: 1,
  title: "Comment évalueriez-vous notre service ?",
  type: "rating",
  option: 4,
};

const survey = {
  surveyId: 1,
  name: "Enquête de Satisfaction 001",
  description: "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
  createdAt: "2024-07-25T08:00:00Z",
  createdBy: {
    employeeName: "Jane Smith",
    employeeRole: "Responsable du service client",
  },
};

const answer = { answerId: 1, questionId: 1, title: "Très satisfait" };

async function main() {
  try {
    // Ajout, récupération, mise à jour et suppression des enquêtes
    await addSurvey(survey);
    await getSurvey();
    await updateSurvey(survey.surveyId, survey); // Mise à jour avec l'ID existant
    await destroySurvey(survey.surveyId); // Suppression avec l'ID existant

    // Ajout, mise à jour, récupération et suppression des réponses
    await addAnswer(answer);
    await updateAnswer(answer.answerId, answer); // Mise à jour avec l'ID existant
    await getAnswer();
    await destroyAnswer(answer.answerId); // Suppression avec l'ID existant

    // Ajout, récupération, mise à jour et suppression des questions
    await addQuestion(question);
    await getQuestion();
    await updateQuestion(question.questionId, question); // Mise à jour avec l'ID existant
    await destroyQuestion(question.questionId); // Suppression avec l'ID existant
  } catch (e) {
    console.error(`Une erreur s'est produite : ${e.message}`);
  } finally {
    await client.close();
  }
}

main();
