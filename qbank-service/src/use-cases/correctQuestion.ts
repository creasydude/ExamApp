import makeQbank from "../qbank";
import ExtendedError from "../utils/ExtendedError";

export default function makeCorrectQuestion({
  Database,
}: makeCorrectQuestionParameters) {
  return async function correctQuestion(httpRequest: httpRequestInterface) {
    //Set Mode To CORRECTION
    const mode = "CORRECTION";
    //Get Data From Request
    const { qbankSecret, answers } = httpRequest?.body;

    //Give Data To Entitty
    const entitty = await makeQbank({ qbankSecret, answers, mode });

    //Check Qbank Secret
    if (!entitty.compareQbankSecrets())
      throw new ExtendedError("Missing qbankSecret", 400);

    //Correct The Questions
    const answersArr = entitty.getAnswers()!;

    let answersResult = [];
    let totalNumberOfQuestionsCorrected = 0;
    let correctQuestions = 0;
    let wrongQuestions = 0;
    for (let i = 0; i < answersArr.length; i++) {
      const questions = await Database.findOneDocument({
        questionId: answersArr[i].questionId,
      });
      if (!questions) throw new ExtendedError("Invalid Question Id", 400);
      const clientAnswerId = answers[i]?.answerId;
      const serverAnswerId = questions?.answerId;
      // if (!questions) new ExtendedError("Wrong questionId(s)",400)
      totalNumberOfQuestionsCorrected++;
      if (serverAnswerId === clientAnswerId) {
        correctQuestions++;
        answersResult.push({
          correct: true,
          questionId: questions?.questionId,
          questionText: questions?.questionText,
          serverAnswer: serverAnswerId,
          clientAnswer: clientAnswerId,
        });
      } else if (serverAnswerId !== clientAnswerId) {
        wrongQuestions++;
        answersResult.push({
          correct: false,
          questionId: questions?.questionId,
          questionText: questions?.questionText,
          serverAnswer: serverAnswerId,
          clientAnswer: clientAnswerId,
        });
      }
    }

    // Return
    return {
      totalNumberOfQuestionsCorrected,
      correctQuestions,
      wrongQuestions,
      answersResult,
    };
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";
import questionDB from "../data-access";

interface makeCorrectQuestionParameters {
  Database: typeof questionDB;
}
