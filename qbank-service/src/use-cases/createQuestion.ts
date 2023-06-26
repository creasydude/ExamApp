import makeQbank from "../qbank";
import ExtendedError from "../utils/ExtendedError";

export default function makeCreateQuestion({
  Database,
}: makeCreateQuestionParameters) {
  return async function createQuestion(httpRequest: httpRequestInterface) {
    //Set Mode To Create
    const mode = "CREATE"

    //Get Data From Request
    const { questions, qbankSecret } = httpRequest?.body;

    //Give Questions To Entitty
    const entitty = await makeQbank({ qbankSecret, mode, questions });

    //Check Secret
    if (!entitty.compareQbankSecrets())
      throw new ExtendedError("Missing qbankSecret", 400);

    //Store Questions In DB
    const modifiedQuestions = entitty.getGeneratedIdQuestions()!;

    const results = [];
    for (let i = 0; i < modifiedQuestions.length; i++) {
      // Insert each object into the collection
      try {
        await Database.createDocument(modifiedQuestions[i]);
        results.push({inserted : true , error : null, question : modifiedQuestions[i]});
      } catch (err) {
        results.push({inserted : false , error : (err as Error).message , question : modifiedQuestions[i]});
      }
    }
    //Return Questions
    return results;
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";
import questionDB from "../data-access";

interface makeCreateQuestionParameters {
  Database: typeof questionDB;
}
