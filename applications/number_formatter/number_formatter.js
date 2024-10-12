const { argv, stdin } = require("node:process");
const path = require("node:path");
const fs = require("node:fs/promises");

const format = (num, sign) => {
  return ` ${sign}${Number(num).toLocaleString()} `;
};
const main = async () => {
  const [_, __, file, sign] = argv;
  //   console.log("args: %s, %s", file, sign);
  const filePath = path.join(__dirname, file);
  const fileHandler = await fs.open(filePath, "w");
  const fileStream = fileHandler.createWriteStream({ encoding: "utf-8" });
  let number = "";
  stdin.on("data", (data) => {
    // const numbers = ;
    for (let n of data.toString("utf-8")) {
      if (n != " ") {
        number += n;
      }
      // console.log("num: %s", number);
      if (n === " ") {
        const newData = format(number, sign);
        if (!fileStream.write(newData)) {
          stdin.pause();
        }
      }
    }
  });

  fileStream.on("drain", () => {
    stdin.resume();
  });

  stdin.on("end", () => {
    console.log("completed...");
  });
};

main();
