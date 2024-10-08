const { stdin } = require("node:process");
const fs = require("node:fs");

const destFile = process.argv[2];
const sign = process.argv[3];
let numbers = [];
const formate = (data, sign) => {
  return data.map((number) => {
    return `${sign}${number}`;
  });
};

stdin.on("data", (data) => {
  numbers = data.toString("utf-8").split(" ");
  const res = formate(numbers, sign);

  fs.writeFile(destFile, res.join(" "), (err) => {
    if (err) console.log("err ", err);
  });
});
