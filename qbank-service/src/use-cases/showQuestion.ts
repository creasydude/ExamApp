import makeQbank from "../qbank";
import ExtendedError from "../utils/ExtendedError";

export default function makeShowQuestion({
  Database,
}: makeShowQuestionParameters) {
  return async function showQuestion(httpRequest: httpRequestInterface) {
    //Get Unit And Number Of Questions From Request
    const { educationalUnit, questionsNumber } = httpRequest?.params;

    //Validate Params
    if (!educationalUnit || !questionsNumber)
      throw new ExtendedError("Missing unit/number params", 400);

    //Get Questions From DB
    const questions = await Database.findDocument(
      { educationalUnit },
      questionsNumber
    );

    //Check If Questions Number less Throw Error
    if (questions?.length !== Number(questionsNumber))
      throw new ExtendedError(
        "Questions Are Not Enough , Try To Add More Questions In DB",
        400
      );

    //Randomize The Questions Options
    const shuffledQuestions = questions.map((question) => {
      const { ...q } = question.toObject();
      return {
        ...q,
        options: q.options.sort(() => Math.random() - 0.5),
      };
    });

    //Return It
    return { questionsNumber, shuffledQuestions };
  };
}

//Interface
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";
import questionDB from "../data-access";

interface makeShowQuestionParameters {
  Database: typeof questionDB;
}
