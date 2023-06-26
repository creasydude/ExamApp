import mongoose, { Schema, model } from "mongoose";
import makeScheduleDB from "./scheduleDB";

const connectDB = async () => {
  try {
    //Change from ENV file
    const DB_URI = <string>process.env.SCHEDULE_DB_URI;
    await mongoose.connect(DB_URI);
    console.log(`🗄️ User DB Connected`);
  } catch (err) {
    throw err;
  }
};

const scheduleDB = makeScheduleDB({ mongoSchema: Schema, mongoModel: model });

export { connectDB, scheduleDB };
export default scheduleDB;