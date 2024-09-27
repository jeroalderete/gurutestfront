"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
   const socket = useContext(SocketContext);
   return socket;
};

interface SocketProviderProps {
   children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
   const { children } = props;
   const [socket, setSocket] = useState<Socket | null>(null);

   const URL = "https://webrtcapipublic-1.onrender.com"; // URL del servidor

   useEffect(() => {
      const connection = io(URL, {
         transports: ["websocket", "polling"], // Asegúrate de incluir ambos transportes
      });
      console.log("Socket connection established:", connection);
      setSocket(connection);

      // Manejo de errores de conexión
      connection.on('connect_error', (err) => {
         console.error("Error establishing socket connection:", err);
      });

      return () => {
         connection.disconnect();
      };
   }, []);

   return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
   );
};