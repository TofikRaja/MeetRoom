import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";
import mongoose from "mongoose";

import connectToSocket from "./controllers/socketManager.js";

import cors from "cors";

import userRoutes from "./routes/user_routes.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 5000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);
//app.use(/api/v2/user, newuserRoutes);

const start = async() => {
    app.set("mongo_user");
    const connectionDb = await mongoose.connect("mongodb+srv://tofikraja101:ndNQY7JJeQdD4N3j@cluster0.zk7xcld.mongodb.net/");
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 5000");
    });
}

start();

