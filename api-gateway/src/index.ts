import express, { Application, Request, Response, NextFunction } from "express";

const app : Application = express();
app.get("/hello", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Hello" });
});

const PORT = <string>process.env.PORT;
app.listen(PORT,() => {
    console.log(`🚀 Server Running On Port :${PORT}`)
})