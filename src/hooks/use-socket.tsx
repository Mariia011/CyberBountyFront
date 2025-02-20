import { useEffect, useState } from "react";

export function useWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected!");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessage(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected!");
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (msg: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    } else {
      console.warn("WebSocket is not open");
    }
  };

  return { message, sendMessage, isConnected };
}
