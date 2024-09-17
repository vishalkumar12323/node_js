const net = require("node:net");
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (direction) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(direction, () => {
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

    let userId;
    socket.on("data", async (data) => {
      if (data.toString("utf-8").substring(0, 2) === "id") {
        userId = Number(data.toString("utf-8").split(" ")[1]);
      } else {
        console.log();
        await moveCursor(0, -1);
        await clearLine(0);
        console.log("User " + userId + "->" + " " + data.toString("utf-8"));
        ask();
      }
    });
  }
);

socket.on("end", () => {
  console.log("connection was ended!");
});
