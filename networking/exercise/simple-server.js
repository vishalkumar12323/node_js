const net = require("node:net");
const server = net.createServer();

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});
server.listen(8080, "127.0.0.1", () => {
  console.log("Net Server Opened to ", server.address());
});
