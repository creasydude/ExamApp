import makeSchedule from "../schedule";
import ExtendedError from "../utils/ExtendedError";

export default function makeCreateSchedule({
  Database,
}: makeCreateScheduleParameters) {
  return async function createSchedule(httpRequest: httpRequestInterface) {
    //Get data from request
    const {
      scheduleSecret,
      username,
      educationalUnitName,
      educationalUnitId,
      examTimeStart,
      examTimeExpire,
      questions,
    } = httpRequest?.body;

    //Get Data To Entity
    const entity = await makeSchedule({
      scheduleSecret,
      username,
      educationalUnitName,
      educationalUnitId,
      examTimeStart,
      examTimeExpire,
      questions,
    });

    //Compare Schedule Secrets
    if (!entity.compareScheduleSecrets())
      throw new ExtendedError("Missing scheduleSecret", 400);

    //Add Schedule To DB
    const schedule = await Database.createDocument({
      username: entity.getUsername(),
      educationalUnitName: entity.getEducationalUnitName(),
      educationalUnitId: entity.getEducationalUnitId(),
      examTimeStart: entity.getExamTimeStart(),
      examTimeExpire: entity.getExamTimeExpire(),
      questions: entity.getQuestions(),
    });

    //Return Created Schedule
    return schedule;
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/express";
import scheduleDB from "../data-access";

interface makeCreateScheduleParameters {
  Database: typeof scheduleDB;
}
