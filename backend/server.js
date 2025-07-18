import app from './app.js';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // update for prod
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// --- AUTH-LITE HANDSHAKE ---
// Expect chefId in connection query OR use proper auth token decode
io.on('connection', (socket) => {
  const { chefId } = socket.handshake.query;

  if (!chefId) {
    console.warn(`Socket ${socket.id} connected w/o chefId. Not joining a room.`);
    return;
  }

  // Join room for this chef
  const roomName = `chef:${chefId}`;
  socket.join(roomName);
  console.log(`Chef ${chefId} connected -> joined ${roomName}`);

  socket.on('disconnect', () => {
    console.log(`Chef ${chefId} disconnected socket ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { io };
