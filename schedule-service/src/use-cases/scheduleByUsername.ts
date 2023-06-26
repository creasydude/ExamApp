import makeSchedule from "../schedule";
import ExtendedError from "../utils/ExtendedError";

export default function makeScheduleByUsername({
  Database,
}: makeScheduleByUsernameParameters) {
  return async function scheduleByUsername(httpRequest: httpRequestInterface) {
    //Get data from request
    const { username } = httpRequest?.body;

    //Get Data To Entity
    const entity = await makeSchedule({ username });
    const getUsername = entity.getUsername();

    //DB
    const schedule = await Database.findDocument({ username: getUsername });
    if (!schedule) throw new ExtendedError("Schedule Not Found", 404);

    //Return
    return schedule;
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/express";
import scheduleDB from "../data-access";

interface makeScheduleByUsernameParameters {
  Database: typeof scheduleDB;
}
