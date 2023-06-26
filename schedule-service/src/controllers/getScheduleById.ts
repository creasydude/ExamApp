export default function makeGetScheduleById({
    scheduleById,
  }: makeGetScheduleByUsernameParameters) {
    return async function getScheduleById(httpRequest: httpRequestInterface) {
      //Give data from request to use case
      const schedule = await scheduleById(httpRequest);
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
    scheduleById: Function;
  }
  