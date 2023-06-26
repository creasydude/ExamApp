export default function makePatchUpdateQuestion({
  updateQuestion,
}: makePatchUpdateQuestionParameters) {
  return async function patchUpdateQuestion(httpRequest: httpRequestInterface) {
    //Give use-case data
    const questions = await updateQuestion(httpRequest);
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

interface makePatchUpdateQuestionParameters {
  updateQuestion: Function;
}
