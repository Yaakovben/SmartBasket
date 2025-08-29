import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { conectToMongo } from "./mongoose/DB";
import { router } from "./routes/router";
import { SocketManagement } from "./socket/socket";
import morganLogger from "./middlewares/morgan";
import handleServerError from "./middlewares/handleServerError";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(morganLogger);
app.use(express.json());

conectToMongo();

app.use(router);

// יצירת שרת HTTP
const server = http.createServer(app);

// יצירת Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

SocketManagement(io);

app.use(handleServerError);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
