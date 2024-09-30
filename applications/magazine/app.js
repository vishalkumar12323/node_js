const http = require("node:http");

const app = http.createServer();

app.on("request", (request, response) => {
  response.writeHead(200, "ok", {
    cookie: "",
  });
});
app.listen(8000, "::1", () => console.log(`server opened on: http://::1:8000`));
