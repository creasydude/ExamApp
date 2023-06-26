export default function makeUserDB({
  mongoSchema,
  mongoModel,
}: makeUserDBParameters) {
  // Build Schema For User
  const UserSchema = new mongoSchema({
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
      min: [10, "Must be at least 10, got {VALUE}"],
      max: 12,
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    refreshToken: {
      type: String,
    },
  });

  const User = mongoModel("User", UserSchema);

  //Make CRUD Functions
  const createDocument = async ({ ...data }: createDocumentParameters) => {
    try {
      return await User.create(data);
    } catch (err) {
      throw err;
    }
  };
  const findDocument = async ({ ...data }: any) => {
    try {
      return await User.find(data);
    } catch (err) {
      throw err;
    }
  };
  const findOneDocument = async ({ ...data }: any) => {
    try {
      return await User.findOne(data);
    } catch (err) {
      throw err;
    }
  };
  const findOneAndUpdateDocument = async (
    { ...documentData }: any,
    { ...updateData }: any
  ) => {
    try {
      return await User.findOneAndUpdate(documentData, updateData);
    } catch (err) {
      throw err;
    }
  };
  const findOneAndDeleteDocument = async ({ ...data }) => {
    try {
      return await User.findOneAndDelete(data);
    } catch (err) {
      throw err;
    }
  };
  const findByIdDocument = async (id: string) => {
    try {
      return await User.findById(id);
    } catch (err) {
      throw err;
    }
  };

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
interface makeUserDBParameters {
  mongoSchema: typeof Schema;
  mongoModel: typeof model;
}

interface createDocumentParameters {
  username: string;
  password: string;
  refreshToken?: string;
}
