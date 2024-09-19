const net = require("node:net");
const fs = require("node:fs/promises");

const socket = net.createConnection({ port: 4050, host: "::1" }, () => {
  console.log("connected to the server");
});

async function init() {
  const fileHandler = await fs.open("one.txt", "r");
  const stream = fileHandler.createReadStream({ encoding: "utf-8" });

  stream.on("data", (data) => {
    if (!socket.write(data)) {
      stream.pause();
    }
  });

  socket.on("drain", () => {
    console.log("drained");
    stream.resume();
  });
  stream.on("end", () => {
    console.log("file uploaded completed");
  });
}

init();
