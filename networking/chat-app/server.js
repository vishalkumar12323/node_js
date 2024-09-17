const net = require("node:net");

const port = 4080;
const hostname = "127.0.0.1";

const server = net.createServer();
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");
  const clientId = clients.length + 1;

  clients.map((client) => {
    client.socket.write(`User ${clientId} joined.`);
  });

  socket.write(`id ${clientId}`);
  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const userId = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);
    clients.forEach((client) => {
      client.socket.write(`> User ${userId}: ${message}`);
    });
  });

  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left.`);
    });
  });
  clients.push({ id: clientId, socket });
});

server.listen({ port, hostname }, () =>
  console.log(`server on to the http://${hostname}:${port}`)
);
