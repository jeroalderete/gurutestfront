"use client"

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

export const SocketProvider: React.FC<SocketProviderProps> = ( props ) => {
   const { children } = props;
   const [socket, setSocket] = useState<Socket | null>(null);

 const URL = "https://webrtcapipublic-1.onrender.com";

   useEffect(() => {
      const connection = io();
      console.log("socket connection", connection)
      setSocket(connection);

      return () => {
         connection.disconnect();
      };

    }, []);

 

 socket?.on('connect_error', async (err) => {
    console.log("Error establishing socket", err)
    await fetch('https://webrtcapipublic-1.onrender.com')
  }) 

   return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
   );
};
