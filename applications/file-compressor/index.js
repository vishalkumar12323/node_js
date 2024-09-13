const { FileZipper } = require("./lib/index");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const zip = new FileZipper({
  encoding: "utf-8",
  readableHighWaterMark: 10 * 1024,
  writableHighWaterMark: 10 * 1024,
});

// zip.compress({ sourcePath: "./read.txt", destPath: "./write.txt.gz" });
zip.decompress({ sourcePath: "./write.txt.gz", destPath: "./new.txt" });
