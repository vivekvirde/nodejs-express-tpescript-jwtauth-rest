import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";

import {authorsRouter} from "./routes/authorsRouter";
import {booksRouter} from "./routes/booksRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});