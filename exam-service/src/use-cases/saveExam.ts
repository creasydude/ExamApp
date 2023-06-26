
import ExtendedError from "../utils/ExtendedError";

export default function makeSaveExam({
  Database,
}: makeSaveExamParameters) {
  return async function saveExam(httpRequest: httpRequestInterface) {
    //Get Unit And Number Of Questions From Request

    //Validate Params

    //Get Questions From DB


    //Check If Questions Number less Throw Error


    //Randomize The Questions Options


    //Return It

  };
}

//Interface
import { httpRequestInterface } from "../framework-callback-adapter/express";
import examDB from "../data-access";

interface makeSaveExamParameters {
  Database: typeof examDB;
}
