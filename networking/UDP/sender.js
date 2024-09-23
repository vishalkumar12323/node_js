const dgram = require("node:dgram");

const client = dgram.createSocket({ type: "udp4" });

client.bind(4040);
client.send(
  "hello udp server, how're you?",
  4040,
  "127.0.0.1",
  (err, bytes) => {
    if (err) console.log("err ", { err });
    console.log("reading bytes ", bytes);
  }
);
