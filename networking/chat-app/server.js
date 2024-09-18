const net = require("node:net");

const port = 4080;
const hostname = "127.0.0.1";

const server = net.createServer();
const clients = [];
let users = [];
server.on("connection", (socket) => {
  console.log("A new connection to the server!");
  const clientId = clients.length + 1;

  clients.map((client) => {
    client.socket.write(`User ${clientId} joined chat.`);
  });

  socket.write(`id ${clientId}`);
  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    // console.log(dataString.substring(0, 5));
    if (dataString.substring(0, 5) === "users") {
      users = dataString.substring(dataString.indexOf("user") + 5);
      users = JSON.parse(users).map((user) => {
        return {
          ...user,
          userId: clientId,
        };
      });
    }
    // const userId = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    users.forEach((user) => {
      socket.write(`User ${user.userId} ${user.username}: ${message}`);
    });
  });

  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left to the chat`);
    });
  });
  socket.on("error", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left to the chat.`);
    });
  });
  clients.push({ id: clientId, socket });
});

server.listen({ port, hostname }, () =>
  console.log(`server on to the http://${hostname}:${port}`)
);
