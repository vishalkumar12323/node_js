const http = require("node:http");

const agent = new http.Agent({ keepAlive: false });
const client = http.request({
  agent: agent,
  port: 4050,
  hostname: "::1",
  method: "POST",
  path: "/create",
  headers: {
    "Content-Type": "application/json",
    Connection: "close",
  },
});

client.on("response", (res) => {
  console.log("StatusCode: ", res.statusCode);
  res.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });
});
client.end(JSON.stringify({ name: "daley", age: 25 }));
