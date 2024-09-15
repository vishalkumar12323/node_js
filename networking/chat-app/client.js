const net = require("node:net");

const client = net.createConnection({ port: 4080, host: "127.0.0.1" }, () => {
  console.log("client connected to the TCP server");
});

client.on("end", () => {
  console.log("connection ended!");
});
