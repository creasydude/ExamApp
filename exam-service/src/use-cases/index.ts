import { examDB as Database } from "../data-access";
import makeSaveExam from "./saveExam";

const saveExam = makeSaveExam({ Database });

export default saveExam;
