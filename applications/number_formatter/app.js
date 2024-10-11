const { spawn } = require("node:child_process");
const fs = require("node:fs");

const numberFormatter = spawn("./number_formatter", ["./dest.txt"]);

numberFormatter.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

numberFormatter.on("close", (code) => {
  if (code === 0) {
    console.log("file was successfully read, processed and writtend");
  } else {
    console.log("something wrong happend");
  }
});
const fileStream = fs.createReadStream("./source.txt");
fileStream.pipe(numberFormatter.stdin);
