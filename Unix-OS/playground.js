const { exec, spawn } = require("node:child_process");

console.log("argv ", process?.argv);
const subProcecss = spawn("./playground", ["frist", "-f", "-h", "string"]);

subProcecss.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

console.log("child ", process?.pid);
console.log("parent ", process?.ppid);
// exec("pwd", (err, stdout, stderr) => {
//   if (err) console.log("error ", err);
//   console.log(stdout);
//   console.log("stderr: ", stderr);
// });
