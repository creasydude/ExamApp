import buildMakeQbank from "./qbank";
import { v4 as uuidv4 } from "uuid";

const makeQbank = buildMakeQbank({ idGenerator: uuidv4 });

export default makeQbank;
