const fs = require("node:fs");
const stream = require("node:stream").promises;

(async () => {
  await stream.pipeline(
    fs.createReadStream("read.txt"),
    fs.createWriteStream("write.txt")
  );
})().catch((err) => console.log("error ", err));
