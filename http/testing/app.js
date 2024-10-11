const Express = require("../../applications/express-framework/new-express");

const app = new Express();

app.route("get", "/", (req, res) => {
  //   res.status(200, "ok").sendFile("./index.html");
  res.status(200, "ok").serve("public");
});
// app.route("get", "/styles.css", (req, res) => {
//   res.status(200, "ok").sendFile("./styles.css");
// });
// app.route("get", "/script.js", (req, res) => {
//   res.status(200, "ok").sendFile("./script.js");
// });

// app.route("get", "/json", (req, res) => {
//   res.status(200, "ok").json({ msg: "success" });
// });
app.start({ port: 3000, hostname: "::1" }, () =>
  console.log("server opened on port:3000")
);
