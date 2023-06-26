import makeQbank from "../qbank";
import ExtendedError from "../utils/ExtendedError";

export default function makeRemoveQuestion({
  Database,
}: makeRemoveQuestionParameters) {
  return async function removeQuestion(httpRequest: httpRequestInterface) {
    //Set the mode
    const mode = "DELETE";

    //Get Data From Request
    const { qbankSecret, questions } = httpRequest?.body;

    //Give Data To Entitty
    const entitty = await makeQbank({ mode, qbankSecret, questions });

    //Check Secret
    if (!entitty.compareQbankSecrets())
      throw new ExtendedError("Missing qbankSecret", 400);

    //Delete Data From
    const questionIds = entitty.getRawQuestions()!;

    const results = [];
    for (let i = 0; i < questionIds.length; i++) {
      // Delete each object from the collection
      const deleteQuestions = await Database.findOneAndDeleteDocument({
        questionId: questionIds[i].questionId,
      });
      if (deleteQuestions === null) {
        results.push({
          deleted: false,
          wrongQuestionId: true,
          ...questionIds[i],
        });
      } else {
        results.push({
          deleted: true,
          wrongQuestionId: false,
          ...questionIds[i],
        });
      }
    }
    return results;
  };
}

//Interface
import questionDB from "../data-access";
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makeRemoveQuestionParameters {
  Database: typeof questionDB;
}
