const net = require("node:net");

const port = 4080,
  hostname = "127.0.0.1";

const server = net.createServer();
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");
  const clientId = clients.length + 1;
  socket.write(`id ${clientId}`);
  socket.on("data", (data) => {
    clients.forEach((obj) => {
      obj.socket.write(data);
    });
  });

  clients.push({ id: clientId, socket });
});

server.listen({ port, hostname }, () =>
  console.log(`server on to the http://${hostname}:${port}`)
);
