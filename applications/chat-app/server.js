const net = require("node:net");

const port = 8080,
  hostname = "::1";

const users = [];
let user = {};
const server = net.createServer();

server.on("connection", (socekt) => {
  socekt.on("data", (data) => {
    const userData = data.toString("utf-8");
    if (userData.substring(0, 4) === "user") {
      user = userData.substring(userData.indexOf("user") + 4);
      user = JSON.parse(user);
    } else {
      console.log(data.toString("utf-8"));
      // socekt.write(data);
    }
  });

  socekt.on("error", (err) => {
    console.log(`${user?.userName} left from the server.`);
  });
});

server.listen(port, hostname, () => {
  console.log("Tcp server opened on ", server.address());
});
