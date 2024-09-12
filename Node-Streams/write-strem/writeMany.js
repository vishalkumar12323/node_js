const fs = require("fs");
const path = require("path");

console.time("Time:");
const file = path.join(__dirname, "one.txt");

/*
    synchoronous example:
    TIME uses: 5m
    CPU uses: 100% ( 1 core )
    RAM uses: 50mb
*/
// const fileDec = fs.openSync(file, 'r');
// for (let i = 0; i < 1000000; i++) {
//     fs.appendFileSync(file, ` ${i} `);
// }
// fs.close(fileDec);
// console.timeEnd("s");

/*
    callback and sync example:
    TIME uses: 10s
    CPU uses: 100% ( 1 core )
    RAM uses: 1GB
*/

fs.open(file, "w", (err, fd) => {
  for (let i = 0; i < 100000000; i++) {
    const buff = Buffer.from(`${i} `, "binary");
    fs.writeSync(fd, buff);
  }
  fs.close(fd);
  console.timeEnd("Time:");
});
