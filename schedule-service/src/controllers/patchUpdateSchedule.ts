export default function makePatchUpdateSchedule({
    updateSchedule,
  }: makePatchUpdateScheduleParameters) {
    return async function patchUpdateSchedule(httpRequest: httpRequestInterface) {
      //Give data from request to use case
      const schedule = await updateSchedule(httpRequest);
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
  
  interface makePatchUpdateScheduleParameters {
    updateSchedule: Function;
  }
  