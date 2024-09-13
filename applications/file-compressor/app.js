// const fs = require("node:fs/promises");
const readline = require("node:readline");

(async function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // rl.question("what's your name: ", (name) => {
  //   console.log("my name is ", name);
  // });
  rl.on("line", (str) => {
    console.log(str + "\n");
    console.log(rl.cursor, " ", rl.line);
  });
})();
