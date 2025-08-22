import { IOType, SocketType } from "../types/socket.types";

export const SocketManagement = (io: IOType) => {
  io.on("connection", (socket: SocketType) => {
    // טיפוס ל-socket: Socket
    console.log(`New client connected: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
