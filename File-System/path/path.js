const path = require("node:path");
const fs = require("node:fs");

const dirPath = path.join(__dirname);
// console.log(dirPath);
fs.readdirSync(dirPath).forEach((file) => {
  if (fs.statSync(file).isDirectory()) return;
  // console.log(file);
  if (path.extname(file) === ".ts") {
    console.log(path.basename(file));
  }
});
