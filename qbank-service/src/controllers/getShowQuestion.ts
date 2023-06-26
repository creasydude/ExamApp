export default function makeGetShowQuestion({
  showQuestion,
}: makeGetShowQuestionParameters) {
  return async function getShowQuestion(httpRequest: httpRequestInterface) {
    const { questionsNumber, shuffledQuestions } = await showQuestion(
      httpRequest
    );
    return {
      statusCode: 200,
      body: {
        success: true,
        questionsNumber,
        questions: shuffledQuestions,
      },
    };
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makeGetShowQuestionParameters {
  showQuestion: Function;
}
