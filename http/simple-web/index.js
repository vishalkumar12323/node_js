const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

const server = http.createServer();
const port = 8080,
  host = "::1";
server.on("request", async (request, response) => {
  if (request.url === "/" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");
    const file = path.resolve("./public/index.html");

    const readStrem = (await fs.open(file, "r")).createReadStream();

    readStrem.pipe(response);
  }
  if (request.url === "/style.css" && request.method === "GET") {
    response.setHeader("Content-Type", "text/css");
    const file = path.resolve("./public/style.css");

    const readStrem = (await fs.open(file, "r")).createReadStream();

    readStrem.pipe(response);
  }
  if (request.url === "/script.js" && request.method === "GET") {
    response.setHeader("Content-Type", "text/javascript");
    const file = path.resolve("./public/script.js");

    const readStrem = (await fs.open(file, "r")).createReadStream();

    readStrem.pipe(response);
  }
});

server.listen(port, host, () =>
  console.log(`server opened on http://${host}:${port}`)
);
