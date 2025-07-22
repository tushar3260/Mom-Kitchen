import { io } from "socket.io-client";

// ✅ For CHEF: Connect with chefId and join order room
export const connectChefSocket = (chefId, orderId) => {
  const socket = io("http://localhost:5000", {
    query: { chefId },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Chef socket connected:", socket.id);
    socket.emit("joinRoom", orderId);
    console.log(`Chef joined room for order: ${orderId}`);
  });

  socket.on("disconnect", () => {
    console.log("Chef socket disconnected:", socket.id);
  });

  return socket;
};

// ✅ For USER: Connect as user and join order room
export const connectUserSocket = (orderId) => {
  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("User socket connected:", socket.id);
    socket.emit("joinRoom", orderId);
    console.log(`User joined room for order: ${orderId}`);
  });

  socket.on("disconnect", () => {
    console.log("User socket disconnected:", socket.id);
  });

  return socket;
};
