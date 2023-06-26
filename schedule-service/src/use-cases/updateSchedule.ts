import makeSchedule from "../schedule";
import ExtendedError from "../utils/ExtendedError";

export default function makeUpdateSchedule({
  Database,
}: makeUpdateScheduleParameters) {
  return async function updateSchedule(httpRequest: httpRequestInterface) {
    //Get data from request
    const {
      scheduleSecret,
      username,
      scheduleId,
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
      scheduleId,
      educationalUnitName,
      educationalUnitId,
      examTimeStart,
      examTimeExpire,
      questions,
    });

    const entityData = {
      ...(entity.getUsername() && { username: entity.getUsername() }),
      ...(entity.getScheduleId() && { scheduleId: entity.getScheduleId() }),
      ...(entity.getEducationalUnitName() && { educationalUnitName: entity.getEducationalUnitName() }),
      ...(entity.getEducationalUnitId() && { educationalUnitId: entity.getEducationalUnitId() }),
      ...(entity.getExamTimeStart() && { examTimeStart: entity.getExamTimeStart() }),
      ...(entity.getExamTimeExpire() && { examTimeExpire: entity.getExamTimeExpire() }),
      ...(entity.getQuestions() && { questions: entity.getQuestions() })
    };
    

    //Compare Schedule Secrets
    if (!entity.compareScheduleSecrets())
      throw new ExtendedError("Missing scheduleSecret", 400);

    //DB
    const updatedQuestion = await Database.findOneAndUpdateDocument({_id : entity.getScheduleId()}, entityData);

    //Return
    return updatedQuestion;
    
  };
}

//Interfaces
import { httpRequestInterface } from "../framework-callback-adapter/express";
import scheduleDB from "../data-access";

interface makeUpdateScheduleParameters {
  Database: typeof scheduleDB;
}
