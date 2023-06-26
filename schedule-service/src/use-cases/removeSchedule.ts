import makeSchedule from "../schedule";
import ExtendedError from "../utils/ExtendedError";

export default function makeRemoveSchedule({
  Database,
}: makeRemoveScheduleParameters) {
  return async function removeSchedule(httpRequest: httpRequestInterface) {
    //Get data from request
    const { scheduleSecret, scheduleId } = httpRequest?.body;

    //Get Data To Entity
    const entity = await makeSchedule({ scheduleSecret, scheduleId });
    const scheduleToDelete = entity.getScheduleId()

    //Compare Schedule Secrets
    if (!entity.compareScheduleSecrets())
      throw new ExtendedError("Missing scheduleSecret", 400);

    //DB
    const deletedSchedule = Database.findOneAndDeleteDocument({_id : scheduleToDelete})

    //Return
    return deletedSchedule
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/express";
import scheduleDB from "../data-access";

interface makeRemoveScheduleParameters {
  Database: typeof scheduleDB;
}
