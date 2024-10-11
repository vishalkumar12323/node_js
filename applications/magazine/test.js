const path = require("node:path");
const fs = require("node:fs");

const filePath = path.join(__dirname, "./public/index.html");

fs.stat(filePath, (er, stat) => {
  if (er) console.log("er ", er);
  console.log(stat);
});
