export default function makePostSaveExam({
  saveExam,
}: makePostSaveExamParameters) {
  return async function postSaveExam(httpRequest: httpRequestInterface) {
    //Give use-case data
    const exam = await saveExam(httpRequest);
    return {
      statusCode: 201,
      body: {
        success: true,
        exam,
      },
    };
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/express";

interface makePostSaveExamParameters {
  saveExam: Function;
}
