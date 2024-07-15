import { useEffect, useState, useRef } from "react";

/**
 * Subcribes to websocket.
 *
 */
export function useWebSocket(url) {
  const ws = useRef(null);
  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [startConnection, setStartConnection] = useState(false);

  useEffect(() => {
    if (!ws.current && startConnection) {
      const wsClient = new WebSocket(url);
      wsClient.onopen = () => {
        ws.current = wsClient;
      };
      wsClient.onmessage = (evt) => {
        setNewMessage(evt.data);
      };
      wsClient.onclose = () => console.log("ws closed");
    }
    if (!startConnection && ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, [startConnection]);

  useEffect(() => {
    setMessages([...messages, newMessage]);
  }, [newMessage]);

  const stopWebSocket = () => {
    setStartConnection(false);
    setMessages([]);
  };

  const sendMessage = (msg) => {
    if (!startConnection && ws.current) {
      ws.current.send(msg);
    }
  };

  const startWebSocket = () => {
    setStartConnection(true);
  };

  return { messages, stopWebSocket, startWebSocket, sendMessage };
}
