import ExtendedError from "../utils/ExtendedError";

export default function buildMakeSchedule({
  time,
}: buildMakeScheduleParameters) {
  return async function makeSchedule({
    scheduleSecret,
    scheduleId,
    username,
    educationalUnitName,
    educationalUnitId,
    examTimeStart,
    examTimeExpire,
    questions,
  }: makeScheduleParameters) {
    //ENV
    const SCHEDULE_SECRET = <string>process.env.SCHEDULE_SECRET;
    //Validate And Compare Schedule Secret
    let comparedScheduleSecrets = false;
    if (scheduleSecret) {
      comparedScheduleSecrets = scheduleSecret == SCHEDULE_SECRET;
    }

    //Calculate Time
    const proximateTimeCalc = time.addTimeToDate;
    const compareExamTime = time.isExpired;

    return Object.freeze({
      compareScheduleSecrets: () => comparedScheduleSecrets,
      getUsername: () => username,
      getScheduleId: () => scheduleId,
      getEducationalUnitName: () => educationalUnitName,
      getEducationalUnitId: () => educationalUnitId,
      proximateTimeCalc,
      getExamTimeStart: () => examTimeStart,
      getExamTimeExpire: () => examTimeExpire,
      compareExamTime,
      getQuestions : () => questions,
    });
  };
}

//Interfaces
interface buildMakeScheduleParameters {
  time: {
    getCurrentDateTime: () => Date;
    addTimeToDate: (timeToAdd: string) => Date;
    isExpired: (expiryDate: Date) => {
      message: string;
      expired: boolean;
    };
  };
}

interface makeScheduleParameters {
  scheduleSecret?: string;
  scheduleId?: string;
  username?: string;
  educationalUnitName?: string;
  educationalUnitId?: string;
  examTimeStart?: string;
  examTimeExpire?: string;
  questions?: any;
}
