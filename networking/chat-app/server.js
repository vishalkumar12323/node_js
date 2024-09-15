const net = require("node:net");

const port = 4080,
  hostname = "127.0.0.1";
const server = net.createServer((socket) => {
  console.log("a new connection was made from the client-side.");
});
// server.on("close", () => {
//   console.log("finally server closed");
// });

server.listen({ port, hostname }, () => {});

// server.close((err) => {
//   console.log("err ", err);
// });
