const http = require("node:http");

const server = http.createServer();

server.on("request", (req, res) => {
  switch (req.url) {
    case "/create": {
      console.log("------Method------");
      console.log(req.method);

      console.log("------Url------");
      console.log(req.url);

      console.log("------Headers------");
      console.log(req.headers);

      let data = "";
      console.log("------Body------");
      req.on("data", (chunk) => {
        data += chunk.toString("utf-8");
        console.log(JSON.parse(chunk.toString("utf-8")));
        req.on("end", () => {
          data = JSON.parse(data);
          res.writeHead(200, "ok", { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              info: `Post created by : ${data.name} & ${data.age} year old.`,
            })
          );
        });
      });
      break;
    }
    default: {
      res.writeHead(404, "Not Found");
      res.end("Error Page Note Found (404)");
    }
  }
});

server.listen(4050, "::1", () => {
  console.log("http server opend on: ", server.address());
});
