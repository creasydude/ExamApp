export default function makeScheduleDB({
  mongoSchema,
  mongoModel,
}: makeScheduleDBParameters) {
  //Schemas
  const QuestionOptionsSchema = new Schema({
    optionId: {
      type: String,
      required: [true, "optionId required"],
    },
    optionText: {
      type: String,
      required: [true, "optionText required"],
    },
  });
  const QuestionSchema = new Schema({
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
        validator: function (options : any) {
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
  
  const ScheduleSchema = new mongoSchema({
    username: {
      type: String,
      required: [true, "username required"],
    },
    educationalUnitName: {
      type: String,
      required: [true, "educationalUnitName required"],
    },
    educationalUnitId: {
      type: String,
      required: [true, "educationalUnitId required"],
    },
    examTimeStart: {
      type: Date,
      required: [true, "examTimeStart required"],
    },
    examTimeExpire: {
      type: Date,
      required: [true, "examTimeExpire required"],
    },
    questions: {
      type: [QuestionSchema],
      required: [true, "questions required"],
    },
  });
  const Schedule = mongoModel("Schedule", ScheduleSchema);

  //CRUD functions
  const createDocument = async ({ ...data }: any) => {
    try {
      return await Schedule.create(data);
    } catch (err) {
      throw err;
    }
  };
  const findDocument = async ({ ...data }: any, limit?: string) => {
    try {
      if (limit) {
        return await Schedule.find(data).limit(Number(limit));
      } else {
        return await Schedule.find(data);
      }
    } catch (err) {
      throw err;
    }
  };
  const findOneDocument = async ({ ...data }: any) => {
    try {
      return await Schedule.findOne(data);
    } catch (err) {
      throw err;
    }
  };
  const findOneAndUpdateDocument = async (
    { ...documentData }: any,
    { ...updateData }: any
  ) => {
    try {
      return await Schedule.findOneAndUpdate(documentData, updateData, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  };
  const findOneAndDeleteDocument = async ({ ...data }) => {
    try {
      return await Schedule.findOneAndDelete(data);
    } catch (err) {
      throw err;
    }
  };
  const findByIdDocument = async (id: string) => {
    try {
      return await Schedule.findById(id);
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

interface makeScheduleDBParameters {
  mongoSchema: typeof Schema;
  mongoModel: typeof model;
}
