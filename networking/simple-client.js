const net = require("node:net");

const client = net.createConnection(
  {
    port: 8080,
    host: "127.0.0.1",
    family: "IPv4",
  },
  () => {
    client.write("this is some data send to the TCP server");

    client.on("close", (hadError) => {
      console.log("server closed", hadError.valueOf());
    });
  }
);
