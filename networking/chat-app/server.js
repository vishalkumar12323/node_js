const net = require("node:net");
const crypto = require("node:crypto");

const port = 4080;
const hostname = "127.0.0.1";

const server = net.createServer();
let users = [];
server.on("connection", (socket) => {
  console.log("A new connection to the server!");

  users.forEach((user) => {
    if (user.socket !== socket) {
      user.socket.write(`User ${user?.username} joined chatroom.`);
    }
  });

  const userId = crypto.randomUUID({ disableEntropyCache: true });
  socket.on("data", (data) => {
    const userData = data.toString("utf-8");
    if (userData.substring(0, 4) === "user") {
      // users.push(userData.substring(userData.indexOf("user") + 4));
      users.map((user) => {
        return {
          ...user,
          username: userData.substring(userData.indexOf("user") + 4),
        };
      });
    }

    const userMessage = userData.substring(userData.indexOf("message-") + 8);
    users.forEach((user) => {
      if (user.socket !== socket)
        user.socket.write(`${user.username}:> ${userMessage}`);
    });
  });

  socket.on("error", () => {
    console.log("ended");
    // users.map((user) => {
    //   user.socket.write(`User ${user.username} left to the chat.`);
    // });
  });
  users.map((user) => {
    return {
      ...user,
      client: socket,
    };
  });
});

server.listen({ port, hostname }, () =>
  console.log(`server on to the http://${hostname}:${port}`)
);
