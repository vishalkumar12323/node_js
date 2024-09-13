const { pipeline } = require("node:stream").promises;
const { createReadStream, createWriteStream } = require("node:fs");
const zlib = require("node:zlib");

(async function () {
  const dataSize = 10 * 1024; // 10kb
  const source = createReadStream("read.txt", { highWaterMark: dataSize });
  const gzip = zlib.createGzip({ chunkSize: dataSize });
  const destination = createWriteStream("write.txt.gz", {
    highWaterMark: dataSize,
  });
  try {
    await pipeline(source, gzip, destination);
  } catch (err) {
    console.log("error ", err);
  }
})();
