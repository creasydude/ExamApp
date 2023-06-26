import ExtendedError from "../utils/ExtendedError";

export default function makePostLogout({ logout }: makePostLogoutParameters) {
  return async function postLogout(httpRequest: httpRequestInterface) {
    try {
      const { message, clearCookie } = await logout(httpRequest);
      return {
        statusCode: 200,
        body: {
          message,
        },
        clearCookie,
      };
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makePostLogoutParameters {
  logout: Function;
}
