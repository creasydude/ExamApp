import mongoose from "mongoose";
import { connectDB, questionDB } from "../../src/data-access/index";

describe("Database Connection", () => {
  beforeAll(async () => {
    // Connect to the database
    await connectDB();
  });

  it("should connect to the database successfully", async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});

describe("Question Database", () => {
  it("should be able to create a question", async () => {
    const question = await questionDB.createDocument({
      questionId: "12345",
      questionText: "What is your name?",
      options: [
        { optionId: "A", optionText: "John" },
        { optionId: "B", optionText: "Jane" },
        { optionId: "C", optionText: "X" },
        { optionId: "D", optionText: "Y" },
      ],
      answerId: "B",
      educationalUnitId: "1",
      educationalUnitName: "Science",
    });

    expect(question).toBeDefined();
    expect(question.id).toBeDefined();
    expect(question.questionText).toBe("What is your name?");
    expect(question.options).toEqual(expect.any(Array));
    expect(question.answerId).toBe("B");
  });

  it("should be able to read/update a question", async () => {
    await questionDB.findOneAndUpdateDocument(
      { questionId: "12345" },
      { questionText: "Was ist dein name?" }
    );

    const updatedQuestion = await questionDB.findOneDocument({questionId: "12345"})

    expect(updatedQuestion).toBeDefined();
    expect(updatedQuestion?.questionText).toBe("Was ist dein name?");
  });

  it("should be able to delete a question", async () => {
    await questionDB.findOneAndDeleteDocument({
      questionId: "12345",
    });

    const deletedQuestion = await questionDB.findOneDocument({questionId: "12345"})
    expect(deletedQuestion).toBeDefined();
    expect(deletedQuestion).toBeNull();

  });

  afterAll(async () => {
    // Disconnect from the database
    await mongoose.disconnect();
  });
});
