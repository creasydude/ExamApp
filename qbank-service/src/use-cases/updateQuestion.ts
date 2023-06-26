import makeQbank from "../qbank";
import ExtendedError from "../utils/ExtendedError";

export default function makeUpdateQuestion({
  Database,
}: makeUpdateQuestionParameters) {
  return async function updateQuestion(httpRequest: httpRequestInterface) {
    //Set Mode For Update
    const mode = "UPDATE";

    //Get Data From Request
    const { questions, qbankSecret } = httpRequest?.body;

    //Give Data To Entitty
    const entitty = await makeQbank({ questions, mode, qbankSecret });

    //Check Secret
    if (!entitty.compareQbankSecrets())
      throw new ExtendedError("Missing qbankSecret", 400);

    //Update From Database
    const modifiedQuestions = entitty.getRawQuestions()!;

    const results = [];
    for (let i = 0; i < modifiedQuestions.length; i++) {
      // Insert each object into the collection

      const updateQuestions = await Database.findOneAndUpdateDocument(
        { questionId: modifiedQuestions[i].questionId },
        modifiedQuestions[i]
      );
      if (updateQuestions === null) {
        results.push({
          update: false,
          wrongQuestionId: true,
          question: modifiedQuestions[i],
        });
      } else {
        results.push({
          update: true,
          wrongQuestionId: false,
          question: modifiedQuestions[i],
        });
      }
    }
    //Return Questions
    return results;
  };
}

//Interface
import questionDB from "../data-access";
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makeUpdateQuestionParameters {
  Database: typeof questionDB;
}
