const net = require("node:net");
const fs = require("node:fs/promises");

const PORT = 4050,
  HOSTNAME = "::1"; // IPv6
const server = net.createServer();
server.on("connection", (client) => {
  console.log("a new connection to the server");
  let fileHandler,
    stream,
    i = 0;
  client.on("data", async (data) => {
    try {
      if (!fileHandler) {
        client.pause();
        fileHandler = await fs.open("file.txt", "w");
        stream = fileHandler.createWriteStream({ encoding: "utf-8" });
        stream.write(data);

        client.resume();
        stream.on("drain", () => {
          console.log("drained! ", i++);
          client.resume(); // if writable stream internal buffer is empty then resume reading data from the client
        });
      } else {
        if (!stream.write(data)) {
          client.pause(); // if writable stream internal buffer is full then pause reading data from the client
        }
      }
    } catch (err) {
      console.log("error ", err);
    }

    stream.on("finish", async () => {
      await fileHandler.close();
      console.log("data reading finish.");
    });
  });

  client.on("end", () => {
    fileHandler = null;
    stream = null;
    console.log("completed data reading from the client-side.");
  });
  client.on("error", () => {
    console.log("connection ended.");
  });
});
server.listen(PORT, HOSTNAME, () =>
  console.log("uploader server opened on ", server.address())
);
