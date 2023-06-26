export default function makePostCorrectQuestion({
  correctQuestion,
}: makePostCorrectQuestionParameters) {
  return async function postCorrectQuestion(httpRequest: httpRequestInterface) {
    //Give data from request to use case
    const answers = await correctQuestion(httpRequest);
    return {
      statusCode: 200,
      body: {
        success: true,
        answers,
      },
    };
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makePostCorrectQuestionParameters {
  correctQuestion: Function;
}
