export default function makePostLogin({ login }: postLoginParameters) {
  return async function postLogin(httpRequest: httpRequestInterface) {
    try {
      const { user, cookie } = await login(httpRequest);
      return {
        statusCode: 200,
        body: {
          success: true,
          user,
        },
        cookie,
      };
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface postLoginParameters {
  login: Function;
}
