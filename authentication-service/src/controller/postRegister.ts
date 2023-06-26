import ExtendedError from "../utils/ExtendedError";

export default function makePostRegister({
  register,
}: makePostRegisterParameters) {
  return async function postRegister(httpRequest: httpRequestInterface) {
    try {
      const users = await register(httpRequest);
      return {
        statusCode: 201,
        body: {
          success: true,
          users,
        },
      };
    } catch (err) {
      throw err;
    }
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/expressjs";

interface makePostRegisterParameters {
  register: Function;
}
