import express from "express";
import dotenv from "dotenv";
import CORS from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 3009;
const dbURL = process.env.DATABASE_URL;

// Using Cors. Cres = true allows for cookies and auth headers through request
app.use(
  CORS({
    origin: [process.env.ORIGIN],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const server = app.listen(port, () => {
  console.log(`Server Started at  http://localhost:${port}`);
});

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });