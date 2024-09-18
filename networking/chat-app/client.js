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

let userId;
const users = [];
const socket = net.createConnection(
  { port: 4080, host: "127.0.0.1" },
  async () => {
    console.log("connected to the server");
    const username = await rl.question("Please Enter Your Name: ");
    users.push({ username });
    socket.write("users" + JSON.stringify(users));
    const ask = async () => {
      const message = await rl.question("Enter Message:> ");
      await moveCursor(0, -1);
      await clearLine(0);
      socket.write(`${userId}-message-${message}`);
    };

    ask();

    socket.on("data", async (data) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      if (data.toString("utf-8").substring(0, 2) === "id") {
        userId = Number(data.toString("utf-8").substring(3));
        // console.log(`Your id is: ${userId}`);
      } else {
        console.log(data.toString("utf-8"));
      }
      ask();
    });
  }
);
socket.on("end", () => {
  console.log("connection was ended!");
});
