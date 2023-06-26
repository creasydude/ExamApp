import mongoose, { Schema, model } from "mongoose";
import makeUserDB from "./userDB";

const connectDB = async () => {
  try {
    //Change From ENV File
    const DB_URI = <string>process.env.AUTH_DB_URI;
    await mongoose.connect(DB_URI);
    console.log(`🗄️ User DB Connected`);
  } catch (err) {
    throw err;
  }
};

const userDB = makeUserDB({ mongoSchema: Schema, mongoModel: model });

export { connectDB, userDB };
export default userDB;
