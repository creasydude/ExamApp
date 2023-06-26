import Database from "../data-access";
import makeCreateQuestion from "./createQuestion";
import makeUpdateQuestion from "./updateQuestion";
import makeRemoveQuestion from "./removeQuestion";
import makeShowQuestion from "./showQuestion";
import makeCorrectQuestion from "./correctQuestion";

const createQuestion = makeCreateQuestion({ Database });
const updateQuestion = makeUpdateQuestion({ Database });
const removeQuestion = makeRemoveQuestion({ Database });
const showQuestion = makeShowQuestion({ Database });
const correctQuestion = makeCorrectQuestion({ Database });

const useCases = Object.freeze({
  createQuestion,
  updateQuestion,
  removeQuestion,
  showQuestion,
  correctQuestion,
});
export default useCases;
export {
  createQuestion,
  updateQuestion,
  removeQuestion,
  showQuestion,
  correctQuestion,
};
