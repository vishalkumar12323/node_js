const net = require("node:net");
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = async (direction) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(direction, () => {
      resolve();
    });
  });
};

const moveCursor = async (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
const socket = net.createConnection(
  { port: 4080, host: "127.0.0.1" },
  async () => {
    console.log("connected to the server");
    const ask = async () => {
      const message = await rl.question("Enter Message:> ");
      await moveCursor(0, -1);
      await clearLine(0);
      socket.write(message);
    };

    ask();

    socket.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(data.toString("utf-8"));
      ask();
    });
  }
);

socket.on("end", () => {
  console.log("connection ended!");
});
