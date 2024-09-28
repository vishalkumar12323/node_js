const Express = require("./new-express");

const app = new Express();
const port = 4080,
  hostname = "::1";

app.route("get", "/home", (req, res) => {
  res.status(200, "success").sendFile("./index.html", "text/html");
});

app.route("get", "/style.css", (req, res) => {
  res.status(200, "success").sendFile("./style.css", "text/css");
});

app.start({ port, hostname }, () => {
  console.log(`server opened on http://${hostname}:${port}`);
});
