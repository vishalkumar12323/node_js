const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = 4050,
  HOSTNAME = "::1"; // IPv6
const server = net.createServer(() => {});
server.on("connection", (socket) => {
  console.log("a new connection to the server");
  let fileHandler, stream;
  socket.on("data", async (data) => {
    if (!fileHandler) {
      socket.pause();

      const indexOfDivider = data.indexOf("---");
      const fileName = data.subarray(9, indexOfDivider).toString("utf-8");

      fileHandler = await fs.open(`storage/${fileName}`, "w");
      stream = fileHandler.createWriteStream();

      stream.write(data.subarray(indexOfDivider + 3));
      socket.resume();

      stream.on("drain", () => {
        socket.resume(); // if writable stream internal buffer is empty then resume reading data from the socket
      });
    } else {
      if (!stream.write(data)) {
        socket.pause(); // if writable stream internal buffer is full then pause reading data from the socket
      }
    }
  });

  socket.on("end", async () => {
    if (fileHandler) await fileHandler.close();
    fileHandler = null;
    stream = null;
    console.log("connection ended.");
  });
  socket.on("error", async () => {
    // if (fileHandler) await fileHandler.close();
    // fileHandler = null;
    // stream = null;
    // console.log("connection ended.");
  });
});
server.listen(PORT, HOSTNAME, () =>
  console.log("uploader server opened on ", server.address())
);
