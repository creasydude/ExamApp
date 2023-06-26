import ExtendedError from "../utils/ExtendedError";

export default function makeGetRefreshToken({
  refreshToken,
}: makeGetRefreshTokenParameters) {
  return async function getRefreshToken(httpRequest: httpRequestInterface) {
    try {
      const user = await refreshToken(httpRequest);
      return {
        statusCode: 200,
        body: {
          success: true,
          user,
        },
      };
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makeGetRefreshTokenParameters {
  refreshToken: Function;
}
