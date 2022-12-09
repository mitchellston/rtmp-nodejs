// imports
import { Request, Response } from "express";
const express = require("express");
// create express app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/verifyAuthToken", (req: Request, res: Response) => {
  const streamkey = req.body.streamkey;
  if (streamkey === "1234567890") {
    return res.send(true);
  }
  return res.send(false);
});
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
