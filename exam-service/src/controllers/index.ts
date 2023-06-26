import makePostSaveExam from "./postSaveExam";
import saveExam from "../use-cases";

const postSaveExam = makePostSaveExam({ saveExam });
export default postSaveExam;
