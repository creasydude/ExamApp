import makePostCreateSchedule from "./postCreateSchedule";
import makePatchUpdateSchedule from "./patchUpdateSchedule";
import makeDeleteRemoveSchedule from "./deleteRemoveSchedule";
import makeGetScheduleByUsername from "./getScheduleByUsername";
import makeGetScheduleById from "./getScheduleById";
import makeGetCheckSchedule from "./getCheckSchedule";
import {
  createSchedule,
  updateSchedule,
  removeSchedule,
  scheduleByUsername,
  scheduleById,
  checkSchedule,
} from "../use-cases";

const postCreateSchedule = makePostCreateSchedule({ createSchedule });
const patchUpdateSchedule = makePatchUpdateSchedule({ updateSchedule });
const deleteRemoveSchedule = makeDeleteRemoveSchedule({ removeSchedule });
const getScheduleByUsername = makeGetScheduleByUsername({ scheduleByUsername });
const getScheduleById = makeGetScheduleById({ scheduleById });
const getCheckSchedule = makeGetCheckSchedule({ checkSchedule });

const controller = Object.freeze({
  postCreateSchedule,
  patchUpdateSchedule,
  deleteRemoveSchedule,
  getScheduleByUsername,
  getScheduleById,
  getCheckSchedule,
});
export default controller;
export {
  postCreateSchedule,
  patchUpdateSchedule,
  deleteRemoveSchedule,
  getScheduleByUsername,
  getScheduleById,
  getCheckSchedule,
};
