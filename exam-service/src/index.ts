import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import https from "https";
import fs from "fs";

import expressJsCallback from "./framework-callback-adapter/express";
import postSaveExam from "./controllers";
import { connectDB } from "./data-access";

//Dependencies
const app: Application = express();
const PORT = <string>process.env.PORT;
const HTTPS_KEY_FILE_DIR = <string>process.env.HTTPS_KEY;
const HTTPS_CERTIFICATE_FILE_DIR = <string>process.env.HTTPS_CERTIFICATE;

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/exam/save", expressJsCallback(postSaveExam));

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
