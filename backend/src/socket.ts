import { WebSocketServer } from "ws";

const ws = new WebSocketServer({ port: 8080 });

ws.on("connection", () => {
  ws.on("message", (data, isBinary) => {
    ws.clients.forEach((client) => {
      if (client.readyState == 1) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
