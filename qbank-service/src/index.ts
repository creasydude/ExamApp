import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import https from "https";
import fs from "fs";

import { connectDB } from "./data-access";
import expressJsCallback from "./framework-callback-adapter/expressjs";
import {
  postCreateQuestion,
  patchUpdateQuestion,
  deleteRemoveQuestion,
  getShowQuestion,
  postCorrectQuestion
} from "./controllers";

//Dependencies
const app: Application = express();
const PORT = <string>process.env.PORT;
const COOKIE_SECRET = <string>process.env.COOKIE_SECRET;
const HTTPS_KEY_FILE_DIR = <string>process.env.HTTPS_KEY;
const HTTPS_CERTIFICATE_FILE_DIR = <string>process.env.HTTPS_CERTIFICATE;

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(COOKIE_SECRET));

//Routes
app.post("/questions/create", expressJsCallback(postCreateQuestion));
app.patch("/questions/update", expressJsCallback(patchUpdateQuestion));
app.delete("/questions/delete", expressJsCallback(deleteRemoveQuestion));
app.get("/questions/show/:educationalUnit/:questionsNumber", expressJsCallback(getShowQuestion));
app.post("/questions/correction", expressJsCallback(postCorrectQuestion));

//404 Handler
app.use("*", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    success: false,
    error: {
      message: "Not Found",
    },
  });
});

//Server
if (<string>process.env.NODE_ENV === "production") {
  //You Should edit this and use your certificate
  const httpsOptions = {
    key: fs.readFileSync(
      path.join(__dirname, HTTPS_KEY_FILE_DIR, "domain-key.pem")
    ),
    cert: fs.readFileSync(
      path.join(__dirname, HTTPS_CERTIFICATE_FILE_DIR, "domain.pem")
    ),
  };
  https.createServer(httpsOptions, app).listen(PORT, function () {
    connectDB();
    console.log(`🚀 Server Running On Port :${PORT}`);
  });
} else {
  app.listen(PORT, function () {
    connectDB();
    console.log(`🚀 Server Running On Port :${PORT}`);
  });
}

//Handle Error
process.on("uncaughtException", function (err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});
