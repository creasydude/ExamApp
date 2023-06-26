import ExtendedError from "../utils/ExtendedError";

export default function buildMakeQbank({
  idGenerator,
}: buildMakeQbankParameters) {
  return async function makeQbank({
    qbankSecret,
    mode,
    questions,
    answers,
  }: makeQbankParameters): Promise<makeQbankReturn> {
    //Edit this in env file
    const QBANK_SECRET = process.env.QBANK_SECRET as string;
    //Modes :
    const modes = ["CREATE", "UPDATE", "DELETE", "CORRECTION"];

    //Validate mode and qbankSecret
    if (!mode) throw new ExtendedError("Missing credentials: mode", 400);
    if (!qbankSecret) throw new ExtendedError("Missing credentials: qbankSecret", 400);

    //Validate CREATE questions
    if (questions?.length && mode === modes[0]) {
      for (let i = 0; i < questions!.length; i++) {
        const question = questions![i];
        const {
          questionText,
          options,
          answerId,
          educationalUnitId,
          educationalUnitName,
        } = question;

        if (
          !questionText ||
          !options ||
          !answerId ||
          !educationalUnitId ||
          !educationalUnitName ||
          options.length !== 4
        ) {
          throw new ExtendedError(
            "Wrong question(s) field , or more/less question options, check again",
            400
          );
        }
        for (let j = 0; j < options.length; j++) {
          const option = options[j];
          const { optionId, optionText } = option;

          if (!optionId || !optionText) {
            throw new ExtendedError(
              "Wrong question(s) field , check again",
              400
            );
          }
        }
      }
    }

    //Validate UPDATE questions
    if (questions?.length && mode === modes[1]) {
      for (let i = 0; i < questions!.length; i++) {
        const question = questions![i];
        if (!question.questionId) {
          throw new ExtendedError(
            "You need to enter questionId for update question",
            400
          );
        }
      }
    }

    //Validate DELETE questions
    if (questions?.length && mode === modes[2]) {
      for (let i = 0; i < questions!.length; i++) {
        const question = questions![i];
        if (!question.questionId) {
          throw new ExtendedError(
            "You need to enter questionId for delete question",
            400
          );
        }
      }
    }

    //Validate CORRECTION questions
    if (answers?.length && mode === modes[3]) {
      for (let i = 0; i < answers?.length; i++) {
        const question = answers[i];
        const { questionId, answerId } = question;
        if (!questionId || !answerId) {
          throw new ExtendedError(
            "You need to enter questionId , answerId for every question for correction",
            400
          );
        }
      }
    }

    //Modify Questions and Add ID to it
    const modifiedQuestions = questions?.map((question) => {
      return { questionId: idGenerator(), ...question };
    });

    //Compare qbankSecret
    const comparedQbankSecret = qbankSecret == QBANK_SECRET;

    return Object.freeze({
      compareQbankSecrets: () => comparedQbankSecret,
      getGeneratedIdQuestions: () => modifiedQuestions,
      getRawQuestions: () => questions,
      getAnswers: () => answers,
    });
  };
}

// Interfaces
interface buildMakeQbankParameters {
  idGenerator: () => string;
}

interface QOption {
  optionId: string;
  optionText: string;
}

interface Question {
  questionId?: string;
  questionText?: string;
  options?: QOption[];
  answerId?: string;
  educationalUnitId?: string;
  educationalUnitName?: string;
}

interface Answer {
  questionId: string;
  answerId: string;
}

interface makeQbankParameters {
  qbankSecret: string;
  mode: string;
  questionId?: string;
  questions?: Question[];
  answers?: Answer[];
}

interface makeQbankReturn {
  compareQbankSecrets: () => boolean;
  getGeneratedIdQuestions: () => Question[] | undefined;
  getRawQuestions: () => Question[] | undefined;
  getAnswers: () => Answer[] | undefined;
}
