const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = 4050;
const HOSTNAME = "::1";
const server = net.createServer();

server.on("connection", (socket) => {
  console.log("new connection to the server");

  let fileHandler, stream;
  socket.on("data", async (data) => {
    try {
      if (!fileHandler) {
        fileHandler = await fs.open("file.txt", "w");
        stream = fileHandler.createWriteStream({ encoding: "utf-8" });
      }

      stream.write(data);
    } catch (err) {
      console.log("error ", err);
    }

    stream.on("finish", async () => {
      await fileHandler.close();
    });
  });

  socket.on("close", () => {
    console.log("server closed with 'close' event");
  });

  socket.on("error", (err) => {
    if (err) console.log("err ", err);
    console.log("server closed with 'error' event");
  });
});

server.listen(PORT, HOSTNAME, () =>
  console.log("uploader server opened on ", server.address())
);
