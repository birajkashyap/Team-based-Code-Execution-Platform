import { io } from "socket.io-client";
const socket = io("http://localhost:4000", { autoConnect: false });

import { useState, useEffect } from "react";

export default function ChatApp() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  const sendMessage = (msg) => {
    socket.emit("chat message", msg);
  };

  return <div>Status: {isConnected ? "Connected" : "Disconnected"}</div>;
}
