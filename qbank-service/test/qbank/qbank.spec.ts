import buildMakeQbank from "../../src/qbank/qbank";

describe("buildMakeQbank", () => {
  const mockIdGenerator = jest.fn(() => "mockId");
  const makeQbank = buildMakeQbank({ idGenerator: mockIdGenerator });
  const modes = ["CREATE", "UPDATE", "DELETE", "CORRECTION"];
  const qbankSecret = "mockSecret";
  const mockQuestion = {
    questionText: "What is your name?",
    options: [
      { optionId: "A", optionText: "John" },
      { optionId: "B", optionText: "Jane" },
      { optionId: "C", optionText: "X" },
      { optionId: "D", optionText: "Y" },
    ],
    answerId: "C",
    educationalUnitId: "1",
    educationalUnitName: "Science",
  };
  const mockAnswers = [
    {
      questionId: "123",
      answerId: "D",
    },
    {
      questionId: "345",
      answerId: "A",
    },
  ];

  beforeEach(() => {
    process.env.QBANK_SECRET = "mockSecret";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws an error when mode or qbankSecret is missing", async () => {
    await expect(
      //@ts-ignore
      makeQbank({})
    ).rejects.toThrow(
      new Error("Missing credentials mode : ✅ | qbankSecret :✅ ")
    );
  });

  it("throws an error when creating a question with missing fields", async () => {
    const questions: Question[] = [
      { ...mockQuestion },
      {
        questionText: "",
        options: [],
        answerId: "",
        educationalUnitId: "",
        educationalUnitName: "",
      },
    ];

    await expect(
      makeQbank({ mode: modes[0], qbankSecret, questions })
    ).rejects.toThrow(
      new Error(
        "Wrong question(s) field , or more/less question options, check again"
      )
    );
  });

  it("adds questionId to questions when creating a question", async () => {
    const questions: Question[] = [{ ...mockQuestion }];
    const result = await makeQbank({
      mode: modes[0],
      qbankSecret,
      questions,
    });

    expect(result.getGeneratedIdQuestions()).toEqual([
      {
        questionId: "mockId",
        questionText: "What is your name?",
        options: [
          { optionId: "A", optionText: "John" },
          { optionId: "B", optionText: "Jane" },
          { optionId: "C", optionText: "X" },
          { optionId: "D", optionText: "Y" },
        ],
        answerId: "C",
        educationalUnitId: "1",
        educationalUnitName: "Science",
      },
    ]);
  });

  it("throws an error when updating a question without a questionId", async () => {
    const questions: Question[] = [{ ...mockQuestion }];

    await expect(
      //@ts-ignore
      makeQbank({ mode: modes[1], qbankSecret, questions })
    ).rejects.toThrow(
      new Error("You need to enter questionId for update question")
    );
  });

  it("throws an error when deleting a question without a questionId", async () => {
    const questions = [{ ...mockQuestion }];
    await expect(
      //@ts-ignore
      makeQbank({ mode: modes[2], qbankSecret, questions })
    ).rejects.toThrow(
      new Error("You need to enter questionId for delete question")
    );
  });

  it("throws an error when correcting a question and missing fields", async () => {
    const answers: Answer[] = [
      ...mockAnswers,
      {
        questionId: "901",
      },
      {
        answerId: "E",
      },
    ];
    await expect(
      //@ts-ignore
      makeQbank({ mode: modes[3], qbankSecret, answers })
    ).rejects.toThrow(
      new Error(
        "You need to enter questionId , answerId for every question for correction"
      )
    );
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
  options?: QOption[];
  answerId?: string;
  educationalUnitId?: string;
  educationalUnitName?: string;
}

interface Answer {
  questionId?: string;
  answerId?: string;
}
