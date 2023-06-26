export default function makePostCreateQuestion({
  createQuestion,
}: makePostCreateQuestionParameters) {
  return async function postCreateQuestion(httpRequest: httpRequestInterface) {
    //Give use-case data
    const questions = await createQuestion(httpRequest);
    return {
      statusCode: 201,
      body: {
        success: true,
        questions,
      },
    };
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makePostCreateQuestionParameters {
  createQuestion: Function;
}
