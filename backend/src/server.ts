import express from "express";
import http from "http";

import { Server, Socket } from "socket.io";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);

  // join a room
  socket.on("join_room", (room: string) => {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
  });

  // send message to room
  socket.on("send_message", (data: { room: string; message: string }) => {
    io.to(data.room).emit("receive_message", data.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
