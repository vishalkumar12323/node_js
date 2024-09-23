const dgram = require("node:dgram");

const server = dgram.createSocket({ type: "udp4" });

server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.bind(4040, "127.0.0.1", () => {
  console.log("UDP server opened on: ", server.address());
});
server.on("listening", () => {
  console.log("data receiving...");
});
