const net = require("node:net");

const port = 4080,
  hostname = "127.0.0.1";

const clients = [];
const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
    clients.forEach((s) => {
      socket.on("data", (data) => {
        s.write(data);
      });
    });
  });

  clients.push(socket);
});

server.listen({ port, hostname }, () =>
  console.log(`server on to the http://${hostname}:${port}`)
);
