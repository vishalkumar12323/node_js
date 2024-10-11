const { stdin, stdout, stderr } = require("node:process");
const fs = require("node:fs");

const fileStream = fs.createReadStream("./text.txt");

fileStream.pipe(stdout);
stdin.on("data", (data) => {
  const upperCaseVersion = data.toString("utf-8").toUpperCase();
  console.log(upperCaseVersion);
});

stdout.on("resize", () => {
  console.log("stdout runn.");
});

stderr.on("resize", () => {
  console.log("stderr runn.");
});
