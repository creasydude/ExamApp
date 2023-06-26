import mongoose, { Schema, model } from "mongoose";
import makeQuestionDB from "./questionDB";

const connectDB = async () => {
  try {
    //Change from ENV file
    const DB_URI = <string>process.env.QUESTION_DB_URI;
    await mongoose.connect(DB_URI);
    console.log(`🗄️ User DB Connected`);
  } catch (err) {
    throw err;
  }
};

const questionDB = makeQuestionDB({ mongoSchema: Schema, mongoModel: model });

export { connectDB, questionDB };
export default questionDB;