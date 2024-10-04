const http = require("node:http");

const server = http.createServer((req, res) => {
  res.end("congratulation");
})

server.listen(8000, "::1", () =>
  console.log("server opened on http://localhost:8000")
);
