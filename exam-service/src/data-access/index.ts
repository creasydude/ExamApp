import mongoose, { Schema, model } from "mongoose";
import makeExamDB from "./examDB";

const connectDB = async () => {
  try {
    //Change from ENV file
    const DB_URI = <string>process.env.EXAM_DB_URI;
    await mongoose.connect(DB_URI);
    console.log(`🗄️ User DB Connected`);
  } catch (err) {
    throw err;
  }
};

const examDB = makeExamDB({ mongoSchema: Schema, mongoModel: model });

export { connectDB, examDB };
export default examDB;