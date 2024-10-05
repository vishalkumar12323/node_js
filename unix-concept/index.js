const { stdin, stdout, stderr } = require("node:process");

stdin.on("data", (data) => {
  console.log("Got the data ", data.toString("utf-8"));
});

stdout.write("This is the data that, I want.\n");
stderr.write("This is the data that, I may not want \n");
