const cpeak = require("cpeak");

const port = 4050;
const app = new cpeak();

app.route("get", "/", (req, res) => {
  res.json({ msg: "Hello baddy." });
});
app.route("get", "/havy", (req, res) => {
  // for (let i = 0; i < 90000000000; i++) {}
  res.json({ msg: "This the havy operation." });
});

app.listen(port, () => console.log(`server opened on port:${port}`));
