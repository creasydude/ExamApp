import makeSchedule from "../schedule";
import ExtendedError from "../utils/ExtendedError";

export default function makeCheckSchedule({
  Database,
}: makeCheckScheduleParameters) {
  return async function checkSchedule(httpRequest: httpRequestInterface) {
    //Get data from request
    const { username, scheduleId } = httpRequest?.body;

    //Get Data To Entity
    const entity = await makeSchedule({ username, scheduleId });
    const getUsername = entity.getUsername();
    const getScheduleId = entity.getScheduleId();

    //Add Schedule To DB
    const schedule = await Database.findOneDocument({
      _id: getScheduleId,
      username: getUsername,
    });
    if (!schedule) throw new ExtendedError("Invalid Schedule", 400);
    const examTimeExpire = schedule?.examTimeExpire;
    const examTimeStart = schedule?.examTimeStart;

    //Check If Exam Not Expired
    const isExpired = entity.compareExamTime(examTimeExpire);

    const results = {
      username,
      scheduleId,
      examTimeStart,
      examTimeExpire,
      isExpired,
    }

    //Return Created Schedule
    return results;
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/express";
import scheduleDB from "../data-access";

interface makeCheckScheduleParameters {
  Database: typeof scheduleDB;
}
