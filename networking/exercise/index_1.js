const net = require("node:net");

const server = net.createServer((socket) => {
  console.log("connection alive.");
});

server.close((err) => {
  console.log("error closing ", err);
});

server.on("close", () => {
  console.log("finally server closed.");
});
server.listen(4080, "127.0.0.1", () => console.log("server.maxConnections"));

// console.log(server.maxConnections);
