import makeAuthorization from "../authentication";
import ExtendedError from "../utils/ExtendedError";

export default function makeLogin({ Database }: makeLoginParameters) {
  return async function login(requestData: loginParameters) {
    //   Form of json we will give in request
    //     {
    //       "username": "test",
    //       "password": "test"
    //   }
    const reqBody = requestData?.body;
    //Check Credentials
    if (Object.keys(reqBody).length == 0)
      throw new ExtendedError("Request Body Empty", 400);
    try {
      //Give request data to entitty
      const { username, password } = reqBody;
      let entitty = await makeAuthorization({
        username,
        password,
      });
      //Check If User Exist
      const User = await Database.findOneDocument({
        username: entitty.getUsername(),
      });
      if (!User) throw new ExtendedError("User Not Found", 404);
      if (!(await entitty.getComparedPassword(User.password)))
        throw new ExtendedError("Incorrect Password", 403);
      //Make Access Token
      const accessToken = entitty.getAccessToken();
      //Make Refresh Token + Save In Db
      const refreshToken = entitty.getRefreshToken();
      User.refreshToken = refreshToken;
      await User.save();
      //Cookie Options - Change it if you want
      const name = "rt";
      const maxAge = 1000 * 30 * 24 * 60 * 60; // 30 days in seconds
      const signed = true;
      const httpOnly =
        <string>process.env.NODE_ENV === "production" ? true : false;
      const secure =
        <string>process.env.NODE_ENV === "production" ? true : false;
      const sameSite =
        <string>process.env.NODE_ENV === "production" ? "strict" : "none";
      //Return Username and Access Token And Store + Save In Cookie
      return {
        user: {
          username: entitty.getUsername(),
          accessToken,
          refreshToken,
        },
        cookie: {
          name,
          value: refreshToken,
          options: {
            maxAge,
            httpOnly,
            secure,
            sameSite,
            signed,
          },
        },
      };
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import userDB from "../data-access";
import { Request } from "express";

interface makeLoginParameters {
  Database: typeof userDB;
}

interface loginParameters extends Request {}
