export default function makeDeleteRemoveSchedule({
    removeSchedule,
  }: makeDeleteRemoveScheduleParameters) {
    return async function deleteRemoveSchedule(httpRequest: httpRequestInterface) {
      //Give data from request to use case
      const removedSchedule = await removeSchedule(httpRequest);
      return {
        statusCode: 200,
        body: {
          success: true,
          removedSchedule,
        },
      };
    }
  }
  
  //Interface
  import { httpRequestInterface } from "../framework-callback-adapter/express";
  
  interface makeDeleteRemoveScheduleParameters {
    removeSchedule: Function;
  }
  