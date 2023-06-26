export default function makeQuestionDB({
  mongoSchema,
  mongoModel,
}: makeQuestionDBParameters) {
  //Schemas
  const QuestionOptionsSchema = new mongoSchema({
    optionId: {
      type: String,
      required: [true, "optionId required"],
    },
    optionText: {
      type: String,
      required: [true, "optionText required"],
    },
  });
  const QuestionSchema = new mongoSchema({
    questionId: {
      type: String,
      required: [true, "questionId required"],
      unique: true,
    },
    questionText: {
      type: String,
      required: [true, "questionText required"],
      min: 4,
      max: 1024,
    },
    options: {
      type: [QuestionOptionsSchema],
      validate: {
        validator: function (options: any[]) {
          return options.length <= 4;
        },
        message: "The maximum number of options is 4",
      },
    },
    answerId: {
      type: String,
      required: [true, "answerId required"],
    },
    educationalUnitId: {
      type: String,
      required: [true, "educationalUnitId required"],
    },
    educationalUnitName: {
      type: String,
      required: [true, "educationalUnitName required"],
    },
  });

  const Question = mongoModel("Question", QuestionSchema);

  //CRUD functions
  const createDocument = async ({ ...data }: createDocumentParameters) => {
    try {
      return await Question.create(data);
    } catch (err) {
      throw err;
    }
  };
  const findDocument = async ({ ...data }: any, limit?: string) => {
    try {
      if (limit) {
        return await Question.find(data).limit(Number(limit));
      } else {
        return await Question.find(data);
      }
    } catch (err) {
      throw err;
    }
  };
  const findOneDocument = async ({ ...data }: any) => {
    try {
      return await Question.findOne(data);
    } catch (err) {
      throw err;
    }
  };
  const findOneAndUpdateDocument = async (
    { ...documentData }: any,
    { ...updateData }: any
  ) => {
    try {
      return await Question.findOneAndUpdate(documentData, updateData, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  };
  const findOneAndDeleteDocument = async ({ ...data }) => {
    try {
      return await Question.findOneAndDelete(data);
    } catch (err) {
      throw err;
    }
  };
  const findByIdDocument = async (id: string) => {
    try {
      return await Question.findById(id);
    } catch (err) {
      throw err;
    }
  };

  //Return functions
  return Object.freeze({
    createDocument,
    findDocument,
    findOneDocument,
    findOneAndUpdateDocument,
    findOneAndDeleteDocument,
    findByIdDocument,
  });
}

//Interfaces
import { Schema, model } from "mongoose";

interface makeQuestionDBParameters {
  mongoSchema: typeof Schema;
  mongoModel: typeof model;
}
interface optionsInterface {
  optionId: string;
  optionText: string;
}
interface createDocumentParameters {
  questionId?: string;
  questionText?: string;
  options?: optionsInterface[];
  answerId?: string;
  educationalUnitId?: string;
  educationalUnitName?: string;
}
