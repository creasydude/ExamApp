import makePostCreateQuestion from "./postCreateQuestion";
import makePatchUpdateQuestion from "./patchUpdateQuestion";
import makeDeleteRemoveQuestion from "./deleteRemoveQuestion";
import makeGetShowQuestion from "./getShowQuestion";
import makePostCorrectQuestion from "./postCorrectQuestion";
import {
  createQuestion,
  updateQuestion,
  removeQuestion,
  showQuestion,
  correctQuestion,
} from "../use-cases";

const postCreateQuestion = makePostCreateQuestion({ createQuestion });
const patchUpdateQuestion = makePatchUpdateQuestion({ updateQuestion });
const deleteRemoveQuestion = makeDeleteRemoveQuestion({ removeQuestion });
const getShowQuestion = makeGetShowQuestion({ showQuestion });
const postCorrectQuestion = makePostCorrectQuestion({ correctQuestion });

const controllers = Object.freeze({
  postCreateQuestion,
  patchUpdateQuestion,
  deleteRemoveQuestion,
  getShowQuestion,
  postCorrectQuestion
});
export default controllers;
export {
  postCreateQuestion,
  patchUpdateQuestion,
  deleteRemoveQuestion,
  getShowQuestion,
  postCorrectQuestion,
};
