import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import https from "https";
import { connectDB } from "./data-access";
import expressJsCallback from "./framework-callback-adapter/expressjs";

import {
  postRegister,
  postLogin,
  getRefreshToken,
  postLogout,
} from "./controller";

//Requirements
const app: Application = express();
const PORT = <string>process.env.PORT;
const COOKIE_SECRET = <string>process.env.COOKIE_SECRET;
const HTTPS_KEY_FILE_DIR = <string>process.env.HTTPS_KEY;
const HTTPS_CERTIFICATE_FILE_DIR = <string>process.env.HTTPS_CERTIFICATE;

//Middlewares
app.use(cors());
app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.json());

//Routes
app.post("/register", expressJsCallback(postRegister));
app.post("/login", expressJsCallback(postLogin));
app.get("/refreshToken", expressJsCallback(getRefreshToken));
app.post("/logout", expressJsCallback(postLogout));

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
