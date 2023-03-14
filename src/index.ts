import express from 'express'
import { AppDataSource } from './config/database.config';
import userRoute from './routes/user.route'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', userRoute)


app.listen(8000, () => {
    console.log("Server has started")

    AppDataSource.initialize()
    .then(() => {
        console.log("Database Connected Successfully🚀!")
    })
    .catch((err) => {
        console.error("Databse connection error", err)
    })
})