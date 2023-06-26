import makeSchedule from "../schedule";
import ExtendedError from "../utils/ExtendedError";

export default function makeScheduleById({
  Database,
}: makeScheduleByIdParameters) {
  return async function scheduleById(httpRequest: httpRequestInterface) {
    //Get data from request
    const { scheduleId } = httpRequest?.params;

    //Get Data To Entity
    const entity = await makeSchedule({ scheduleId });
    const getscheduleId = entity.getScheduleId();

    //DB
    const schedule = await Database.findOneDocument({ _id : getscheduleId});
    if (!schedule) throw new ExtendedError("Schedule Not Found", 404);

    //Return
    return schedule;
    
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/express";
import scheduleDB from "../data-access";

interface makeScheduleByIdParameters {
  Database: typeof scheduleDB;
}