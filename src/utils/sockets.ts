import io from "socket.io-client";
export const socket = {
  users: io("https://meet.arcavirtual.net/users", { transports: ["websocket"] }),
  classrooms: io("https://meet.arcavirtual.net/classrooms", {
    transports: ["websocket"],
  }),
  messaging: io("https://meet.arcavirtual.net/messaging", {
    transports: ["websocket"],
  }),
  topics: io("https://meet.arcavirtual.net/topics", { transports: ["websocket"] }),
};
