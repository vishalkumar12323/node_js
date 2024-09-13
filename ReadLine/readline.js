const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  console.log("the input ", input);
});

rl.prompt(true);
rl.on("close", () => {
  console.log("the program closed using CTRL+C");
});
