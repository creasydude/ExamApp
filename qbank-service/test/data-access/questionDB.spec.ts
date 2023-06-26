import mongoose, { Error, MongooseError } from "mongoose";
import { connectDB, questionDB } from "../../src/data-access/index";

describe("createDocument", () => {
  const _id = new mongoose.Types.ObjectId();
  beforeAll(async () => {
    await connectDB();
  });
  it("should call create with the provided data", async () => {
    const data = {
      _id,
      questionId: "123",
      questionText: "TEST?",
      options: [
        { optionId: "A", optionText: "YES" },
        { optionId: "B", optionText: "NO" },
        { optionId: "C", optionText: "MAYBE" },
        { optionId: "D", optionText: "WHO CARES?" },
      ],
      answerId: "B",
      educationalUnitId: "1",
      educationalUnitName: "Science",
    };
    const question = await questionDB.createDocument(data);
    expect(question._id).toBe(_id);
  });

  it("should throw an error if create fails", async () => {
    const data = {};
    try {
      // @ts-ignore
      await questionDB.createDocument(data);
    } catch (err) {
      expect(err).not.toBeNull();
    }
  });

  describe("findDocument", () => {
    it("should call find with the provided data", async () => {
      const data = {
        questionId: "123",
      };
      const question = await questionDB.findDocument(data);
      expect(question[0]?.questionId).toBe("123");
    });

    it("should return empty object if find fails", async () => {
      const data = {
        questionId: "123456789",
      };
      const question = await questionDB.findDocument(data);
      expect(Object.keys(question).length).toBe(0);
    });
  });

  describe("findOneDocument", () => {
    it("should call findOne with the provided data", async () => {
      const data = {
        questionId: "123",
      };
      const question = await questionDB.findOneDocument(data);
      expect(question?.questionId).toBe("123");
    });

    it("should throw an error if findOne fails", async () => {
      const data = {
        questionId: "123456789",
      };
      const question = await questionDB.findOneDocument(data);
      expect(question).toBeNull();
    });
  });

  describe("findOneAndUpdateDocument", () => {
    it("should call findOneAndUpdate with the provided data", async () => {
      const questionId = "123";
      const updateData = {
        questionText: "TEST UPDATED?",
        options: [
          { optionId: "A", optionText: "YES" },
          { optionId: "B", optionText: "NO" },
          { optionId: "C", optionText: "MAYBE" },
          { optionId: "D", optionText: "WHO CARES?" },
        ],
        answerId: "A",
        educationalUnitId: "1",
        educationalUnitName: "Science",
      };
      const question = await questionDB.findOneAndUpdateDocument(
        { questionId },
        updateData
      );
      expect(question?.questionText).toBe("TEST UPDATED?");
    });

    it("should throw an error if findOneAndUpdate fails", async () => {
      const questionId = "null";
      const updateData = {
        questionText: "TEST UPDATED?",
        options: [
          { optionId: "A", optionText: "YES" },
          { optionId: "B", optionText: "NO" },
          { optionId: "C", optionText: "MAYBE" },
          { optionId: "D", optionText: "WHO CARES?" },
        ],
        answerId: "A",
        educationalUnitId: "1",
        educationalUnitName: "Science",
      };
      const question = await questionDB.findOneAndUpdateDocument({questionId}, updateData)
      expect(question).toBe(null);
    });
  });

    describe("findByIdDocument", () => {
      it("should find a question by its ID", async () => {
        const id : string = _id.toHexString()
        const question = await questionDB.findByIdDocument(id);
        expect(question?._id.toHexString()).toBe(id);
      });
    });

    describe("findOneAndDeleteDocument", () => {
      it("should delete a question from the database", async () => {
        const questionId = "123";
        await questionDB.findOneAndDeleteDocument({
          questionId,
        });
        const deletedQuestion = await questionDB.findOneDocument({questionId: "123"})
        expect(deletedQuestion).toBeDefined();
        expect(deletedQuestion).toBeNull();
      });
    });
});
