const { spawn } = require("node:child_process");

const subprocess = spawn("ls");

subprocess.stdout.on("data", (data) => {
	console.log("dir data: ", data.toString("utf-8"));
});
