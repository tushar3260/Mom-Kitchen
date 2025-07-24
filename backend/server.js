import app from './app.js'; // ✅ Already has express instance & routes
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Serve uploads from 'uploads' folder using the imported app
import express from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Chat logic
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("joinRoom", (orderId) => {
    socket.join(orderId);
    console.log(`Socket ${socket.id} joined order room: ${orderId}`);
  });

  socket.on("sendMessage", async (data) => {
    const { orderId, senderId, senderModel, message } = data;

    if (!orderId || !senderId || !senderModel || !message) {
      console.warn("❌ Invalid message data received.");
      return;
    }

    try {
      const ChatMessage = (await import("./models/ChatMessage.js")).default;

      const newMsg = await ChatMessage.create({
        orderId,
        sender: senderId,
        senderModel,
        message,
      });

      io.to(orderId).emit("receiveMessage", newMsg);
    } catch (err) {
      console.error("❌ Error saving chat message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export { io };
