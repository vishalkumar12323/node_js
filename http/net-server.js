const net = require("node:net");

const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });

  const response = Buffer.from(
    "7b226e616d65223a2264616c6579222c22616765223a32357d",
    "hex"
  );

  socket.write(response);
});

server.listen(5000, "::1", () =>
  console.log(`server opened on `, server.address())
);
