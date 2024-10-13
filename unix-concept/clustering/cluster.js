const cluster = require("node:cluster");
const os = require("node:os");

if (cluster.isPrimary) {
  console.log(`This is the parent process with pid: ${process.pid}`);
  const core = os.availableParallelism();
  for (let i = 0; i < core; i++) {
    const worker = cluster.fork();
    console.log(`This is the child process with pid: ${worker.process.pid}`);
  }
} else {
  require("./index");
}
