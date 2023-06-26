import makeQbank from "../../src/qbank/index";

describe("makeQbank", () => {
  it("should return a function", () => {
    expect(typeof makeQbank).toBe("function");
  });

  it("should return a Qbank entity when called", async () => {
    const qbankSecret = "ABCD";
    const mode = "CORRECTION";
    const questions: Question[] = [
      {
        questionText: "X?",
        options: [
          { optionId: "A", optionText: "YES" },
          { optionId: "B", optionText: "NO" },
          { optionId: "C", optionText: "MAYBE" },
          { optionId: "D", optionText: "WHO CARES?" },
        ],
        answerId: "B",
        educationalUnitId: "102030",
        educationalUnitName: "D",
      },
      {
        questionText: "E?",
        options: [
          { optionId: "A", optionText: "YES" },
          { optionId: "B", optionText: "NO" },
          { optionId: "C", optionText: "MAYBE" },
          { optionId: "D", optionText: "WHO CARES?" },
        ],
        answerId: "B",
        educationalUnitId: "102030",
        educationalUnitName: "D",
      },
    ];
    const answers: Answer[] = [
      {
        questionId: "123",
        answerId: "D",
      },
      {
        questionId: "345",
        answerId: "A",
      },
      {
        questionId: "123",
        answerId: "D",
      },
      {
        questionId: "345",
        answerId: "A",
      },
    ];
    const qbank = await makeQbank({
      qbankSecret,
      mode,
      questions,
      answers,
    });
    expect(qbank).toBeDefined();
    expect(typeof qbank.compareQbankSecrets).toBe("function");
    expect(typeof qbank.getRawQuestions).toBe("function");
    expect(typeof qbank.getGeneratedIdQuestions).toBe("function");
    expect(typeof qbank.getQuestionId).toBe("function");
    expect(typeof qbank.getAnswers).toBe("function");
  });
});

//Interfaces
interface QOption {
  optionId: string;
  optionText: string;
}

interface Question {
  questionId?: string;
  questionText?: string;
  options?: [QOption, QOption, QOption, QOption];
  answerId?: string;
  educationalUnitId?: string;
  educationalUnitName?: string;
}

interface Answer {
  questionId: string;
  answerId: string;
}