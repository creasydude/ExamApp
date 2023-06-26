import makeAuthorization from "../authentication";
import ExtendedError from "../utils/ExtendedError";

export default function makeRegister({ Database }: makeRegisterParameters) {
  return async function register(requestData: registerParameters) {
    //Form of json we will give in request
    //   {
    //     "registerSecret": "ABCD",
    //     "users": [
    //         {
    //             "username": "123456",
    //             "password": "654321"
    //         },
    //         {
    //             "username": "78901",
    //             "password": "09876"
    //         }
    //     ]
    // }
    const reqBody = requestData?.body;
    //Check Request Body Not Be Empty
    if (Object.keys(reqBody).length == 0)
      throw new ExtendedError("Request Body Empty", 400);
    const entitty = await makeAuthorization({
      userArr: reqBody?.users,
      registerSecret: reqBody.registerSecret,
    });
    // Check the Register Secret
    if (!entitty.compareRegisterSecret())
      throw new ExtendedError("Missing Or Invalid Register Secret", 401);

    try {
      const usersArr = await entitty.getUserArr();
      //Save The User(s) In Database
      let successRegister: any[] = [];
      let failedRegister: any[] = [];
      for (let user of usersArr) {
        try {
          const { username, password } : any = user;
          await Database.createDocument({ username, password });
          successRegister.push(user);
        } catch (err) {
          failedRegister.push({ ...user, message: (err as Error).message });
        }
      }
      return { successRegister, failedRegister };
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import userDB from "../data-access";
import { Request } from "express";

interface makeRegisterParameters {
  Database: typeof userDB;
}
interface registerParameters extends Request {}
