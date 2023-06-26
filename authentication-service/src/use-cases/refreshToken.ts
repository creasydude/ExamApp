import makeAuthorization from "../authentication";
import ExtendedError from "../utils/ExtendedError";

export default function makeRefreshToken({
  Database,
}: makeRefreshTokenParameters) {
  return async function refreshToken(requestData: refreshTokenParameters) {
    //Get Stored Cookie Of Refresh Token
    const refreshToken = requestData?.signedCookies?.rt;
    if (!refreshToken) throw new ExtendedError("Missing Refresh Token", 404);

    try {
      //Verify Refresh Token
      let entitty = await makeAuthorization({ refreshToken });
      // const verify = entitty.getVerifiedRefreshToken();
      const { accessToken, verifiedToken } =
        entitty.verifyRefreshTokenAndGetAccessToken();
      const username = verifiedToken?.username;
      //Check the cookie refreshToken with db stored refreshToken
      const User = await Database.findOneDocument({ refreshToken });
      if (!User || User?.username !== username)
        throw new ExtendedError("Invalid Refresh Token", 400);
      //Return new accessToken
      return {
        username,
        accessToken,
      };
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import userDB from "../data-access";
import { Request } from "express";

interface makeRefreshTokenParameters {
  Database: typeof userDB;
}
interface refreshTokenParameters extends Request {}
