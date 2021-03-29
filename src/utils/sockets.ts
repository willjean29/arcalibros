import io from "socket.io-client";
export const socket = {
  users: io("http://localhost:4000/users", { transports: ["websocket"] }),
  classrooms: io("http://localhost:4000/classrooms", {
    transports: ["websocket"],
  }),
  messaging: io("http://localhost:4000/messaging", {
    transports: ["websocket"],
  }),
  topics: io("http://localhost:4000/topics", { transports: ["websocket"] }),
};
