const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");
const { writeFile } = require("node:fs");

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
  if (request.url === "/post" && request.method === "POST") {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 201;

    const body = JSON.stringify({
      _id: Math.floor(Math.random() * 10),
      title: "This is the post title",
      content: "This is the post content",
    });

    response.end(body);
  }

  if (request.url === "/upload" && request.method === "POST") {
    const fileName = request.headers.file;
    const fileHandler = await fs.open(`./storage/${fileName}`, "w");
    const writeStream = fileHandler.createWriteStream();

    response.setHeader("Content-Type", "application/json");
    request.pipe(writeStream);

    request.on("end", () => {
      response.end(JSON.stringify({ message: "file uploaded successfully." }));
    });
  }
});

server.listen(port, host, () =>
  console.log(`server opened on http://${host}:${port}`)
);
