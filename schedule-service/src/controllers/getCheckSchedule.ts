export default function makeGetCheckSchedule({
    checkSchedule,
  }: makeGetCheckScheduleParameters) {
    return async function getCheckSchedule(httpRequest: httpRequestInterface) {
      //Give data from request to use case
      const schedule = await checkSchedule(httpRequest);
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
  
  interface makeGetCheckScheduleParameters {
    checkSchedule: Function;
  }
  