const { exit, argv } = require("node:process");
const fs = require("node:fs");

const dirName = argv[2];
if (dirName) {
  fs.mkdir(dirName, { recursive: true }, (err, dir) => {
    if (err) return;
    console.log("dir ", dir);
  });
} else {
  exit(0);
  return;
}
