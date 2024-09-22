const net = require("node:net");
const fs = require("node:fs/promises");
const path = require("path");

async function moveCursor(dx, dy) {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
}

async function clearLine(direction) {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(direction, () => {
      resolve();
    });
  });
}
const socket = net.createConnection(
  { port: 4050, host: "::1", family: "IPv6" },
  async () => {
    const filePath = process.argv[2];
    const fileName = path.basename(filePath);

    const fileHandler = await fs.open(filePath, "r");
    const readFileStream = fileHandler.createReadStream();

    const fileSize = (await fileHandler.stat()).size;

    let bytesUploaded = 0,
      uploadedPercentage = 0;
    socket.write(`fileName ${fileName}---`);

    console.log();

    readFileStream.on("data", async (data) => {
      if (!socket.write(data)) {
        readFileStream.pause();
      }
      bytesUploaded += data.length;
      let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);
      if (newPercentage !== uploadedPercentage) {
        uploadedPercentage = newPercentage;

        await moveCursor(0, -1);
        await clearLine(0);
        console.log(`file uploading...${uploadedPercentage}%`);
      }
    });

    socket.on("drain", () => {
      readFileStream.resume();
    });

    readFileStream.on("end", () => {
      console.log("The file was successfully uploaded!");
      socket.end();
    });
  }
);
