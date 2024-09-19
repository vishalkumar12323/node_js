const net = require("node:net");
const fs = require("node:fs/promises");

const s = new net.Socket();
// const socket = net.createConnection({ port: 4050, host: "::1" }, () => {
//   socket.on("connect", () => {
//     console.log("successfully connection established to the server");
//     socket.write("this the TCP server created by using node net module");
//   });
// });

s.connect({ port: 4050, host: "::1", family: "IPv6" }, () => {
  console.log("connected");
});
s.write("hello world.");
