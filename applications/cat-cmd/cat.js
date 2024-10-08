const { stdin, stdout, exit, argv } = require("node:process");
const fs = require("node:fs");

const filePath = argv[2];
if (filePath) {
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(stdout);

  fileStream.on("end", () => {
    exit(0);
  });
} else {
  stdin.on("data", (data) => {
    console.log(data.toString("utf-8").toUpperCase().split(","));
  });

  stdin.end("hello");
}
