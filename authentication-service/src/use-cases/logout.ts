import makeAuthorization from "../authentication";
import ExtendedError from "../utils/ExtendedError";

export default function makeLougout({ Database }: makeLogoutParameters) {
  return async function logout(requestData: logoutParameters) {
    //Check if refreshToken exist in cookie
    const refreshToken = requestData?.signedCookies?.rt;
    if (!refreshToken) throw new ExtendedError("Refresh Token Not Found", 404);
    try {
      //Check if refreshToken exist in database
      const User = await Database.findOneDocument({ refreshToken });
      if (!User) throw new ExtendedError("Invalid Refresh Token", 400);
      
      //Destory refreshToken from database
      User.refreshToken = undefined;
      await User.save()

      //Destroy refreshToken from cookie
      return {
        message : "Logout Success",
        clearCookie : "rt"
      }
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import { Request } from "express";
import userDB from "../data-access";

interface makeLogoutParameters {
  Database: typeof userDB;
}
interface logoutParameters extends Request {}
