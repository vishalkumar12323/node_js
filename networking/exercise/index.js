const http = require("node:http");

const port = 8080,
  hostname = "192.168.54.89";
http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ name: "http application" }));
  })
  .listen({ port, hostname }, () => {
    console.log("server on");
  });
