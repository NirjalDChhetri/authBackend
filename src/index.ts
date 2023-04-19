import express from "express";
import routes from './routes/index'
import { AppDataSource } from "./config/database.config";
import cors from 'cors';

const app = express();

app.use(cors());

app.use("/", routes)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(8000, () => {
  console.log("Server has started");

  AppDataSource.initialize()
    .then(() => {
      console.log("Database Connected Successfully🚀!");
    })
    .catch((err) => {
      console.error("Databse connection error", err);
    });
});
