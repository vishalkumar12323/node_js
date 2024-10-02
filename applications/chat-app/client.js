const net = require("node:net");
const readline = require("node:readline/promises");
const crypto = require("node:crypto");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const socekt = net.createConnection({
  port: 8080,
  host: "::1",
  family: "IPv6",
});

socekt.on("connect", async () => {
  const userId = crypto.randomUUID().toString();
  const userName = await rl.question("Enter Your Name:> ");

  const user = JSON.stringify({ userId, userName });

  socekt.write(`user${user}`);

  const askQuestion = async () => {
    const message = await rl.question("Enter your message:> ");
    await moveCursor(0, -1);
    await clearLine(0);
    socekt.write(message);
    askQuestion();
  };

  askQuestion();

  socekt.on("data", async (data) => {
    console.log();
    await moveCursor(0, -1);
    await clearLine(0);
    console.log(data.toString("utf-8"));
    askQuestion();
  });
});
