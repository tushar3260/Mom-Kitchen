import { io } from "socket.io-client";

export const connectChefSocket = (chefId) => {
  return io("http://localhost:5000", {
    query: { chefId }, // This will let backend know which room to join
    transports: ["websocket"], // Ensures stable connection
  });
};
