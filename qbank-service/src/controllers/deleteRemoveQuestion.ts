export default function makeDeleteRemoveQuestion({
  removeQuestion,
}: makeDeleteRemoveQuestionParameters) {
  return async function deleteRemoveQuestion(
    httpRequest: httpRequestInterface
  ) {
    //Give use-case data
    const questions = await removeQuestion(httpRequest);
    return {
      statusCode: 200,
      body: {
        success: true,
        questions,
      },
    };
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makeDeleteRemoveQuestionParameters {
  removeQuestion: Function;
}
