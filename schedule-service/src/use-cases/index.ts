import makeCreateSchedule from "./createSchedule";
import makeUpdateSchedule from "./updateSchedule";
import makeRemoveSchedule from "./removeSchedule";
import makeScheduleById from "./scheduleById";
import makeScheduleByUsername from "./scheduleByUsername";
import makeCheckSchedule from "./checkSchedule";

import { scheduleDB as Database } from "../data-access";

const createSchedule = makeCreateSchedule({ Database });
const updateSchedule = makeUpdateSchedule({ Database });
const removeSchedule = makeRemoveSchedule({ Database });
const scheduleById = makeScheduleById({ Database });
const scheduleByUsername = makeScheduleByUsername({ Database });
const checkSchedule = makeCheckSchedule({ Database });

const useCases = Object.freeze({
  createSchedule,
  updateSchedule,
  removeSchedule,
  scheduleById,
  scheduleByUsername,
  checkSchedule,
});
export {
  createSchedule,
  updateSchedule,
  removeSchedule,
  scheduleById,
  scheduleByUsername,
  checkSchedule,
};
export default useCases;
