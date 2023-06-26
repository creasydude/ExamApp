export default function makePostCreateSchedule({
  createSchedule,
}: makePostCreateScheduleParameters) {
  return async function postCreateSchedule(httpRequest: httpRequestInterface) {
    //Give data from request to use case
    const schedule = await createSchedule(httpRequest);
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

interface makePostCreateScheduleParameters {
  createSchedule: Function;
}
