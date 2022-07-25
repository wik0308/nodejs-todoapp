const express = require("express")
const app = express();
const taskRoute = require("./routes/tasks")
const connectDB = require("./db/connect")
require("dotenv").config();

const PORT = 5000

app.use(express.json())
app.use(express.static("./public"))

// ルーティング設定
app.use("/api/v1/tasks", taskRoute)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, console.log("server launched"))
    } catch (err) {
        console.log(err)
    }
}

start();