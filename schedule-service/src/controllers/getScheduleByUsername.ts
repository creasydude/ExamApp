export default function makeGetScheduleByUsername({
    scheduleByUsername,
  }: makeGetScheduleByUsernameParameters) {
    return async function getScheduleByUsername(httpRequest: httpRequestInterface) {
      //Give data from request to use case
      const schedule = await scheduleByUsername(httpRequest);
      return {
        statusCode: 200,
        body: {
          success: true,
          schedule,
        },
      };
    }
  }
  
  //Interface
  import { httpRequestInterface } from "../framework-callback-adapter/express";
  
  interface makeGetScheduleByUsernameParameters {
    scheduleByUsername: Function;
  }
  