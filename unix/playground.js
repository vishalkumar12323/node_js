const { exec, spawn } = require("node:child_process");

// console.log("argv ", process?.argv);
const subProcecss = spawn("echo", ["frist", "-f", "-h", "string"], {
  env: { Mode: "development" },
});

console.log(process.env.foo);
subProcecss.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

console.log("child pid ", process?.pid);
console.log("parent ppid ", process?.ppid);
// exec("pwd", (err, stdout, stderr) => {
//   if (err) console.log("error ", err);
//   console.log(stdout);
//   console.log("stderr: ", stderr);
// });
