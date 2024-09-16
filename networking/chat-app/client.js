const net = require("node:net");
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection(
  { port: 4080, host: "127.0.0.1" },
  async () => {
    console.log("connected to the server");
    const message = await rl.question("Enter Message:> ");
    socket.write(message);
  }
);

socket.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

socket.on("end", () => {
  console.log("connection ended!");
});
