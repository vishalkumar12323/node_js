const cpeak = require("cpeak");

const app = new cpeak();

app.route("get", "/", (req, res) => {
  res.json({ msg: "Hello baddy." });
});
app.route("get", "/havy", (req, res) => {
  for (let i = 0; i < 90000000000; i++) {}
  res.json({ msg: "This the havy operation." });
});

app.listen(4040, () => console.log("server opened on port 4040"));
