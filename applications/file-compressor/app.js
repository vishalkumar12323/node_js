const fs = require("node:fs/promises");

(async function () {
  const file = fs.open("write.txt.gz", "r");
  const stream = (await file).createReadStream({
    encoding: "utf-8",
    highWaterMark: 10 * 1024,
  });

  stream.on("data", (chunk) => {
    console.log(chunk.toString("hex"));
  });

  stream.on("end", async () => {
    console.log("reading finish");
    (await file).close();
  });
})();
