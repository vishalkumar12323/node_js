const Express = require("./new-express.js");

const port = 9002,
  hostname = "::1";

const sessions = [];
const users = [
  { id: 1, name: "Liam brown", username: "liam123", password: "string" },
  { id: 2, name: "Adam bob", username: "adam.bob", password: "string" },
  { id: 3, name: "John duo", username: "johnduo.jd", password: "string" },
];
const posts = [
  {
    id: 1,
    title: "This is the frist post",
    body: " ipsum dolor sit amet consectetur adipisicing elit. Repudiandae natus sint eius omnis quaerat perspiciatis quasi vero, reprehenderit nisi. Dicta, suscipit. Enim laudantium accusantium modi voluptatum deserunt repellendus! Nihil, nisi? ",
    userId: 1,
  },
  {
    id: 2,
    title: "This is the second post",
    body: "ipsum dolor sit amet consectetur adipisicing elit. Repudiandae natus sint eius omnis quaerat perspiciatis quasi vero, reprehenderit nisi. Dicta, suscipit. Enim laudantium accusantium modi voluptatum deserunt repellendus! Nihil, nisi?",
    userId: 2,
  },
  {
    id: 3,
    title: "This is the third post",
    body: "ipsum dolor sit amet consectetur adipisicing elit. Repudiandae natus sint eius omnis quaerat perspiciatis quasi vero, reprehenderit nisi. Dicta, suscipit. Enim laudantium accusantium modi voluptatum deserunt repellendus! Nihil, nisi?",
    userId: 3,
  },
];
const app = new Express();

// Server health check Route ---
app.route("get", "/health", () => {
  res.status(200, "ok").json({ message: "server running well" });
});
// File Routes ---
app.route("get", "/", (req, res) => {
  console.log("proxy using server 2 instance.");
  res.status(200, "success").sendFile("./public/index.html", "text/html");
});

app.route("get", "/profile", (req, res) => {
  res.status(200, "success").sendFile("./public/index.html", "text/html");
});
app.route("get", "/styles.css", (req, res) => {
  res.status(200, "success").sendFile("./public/styles.css", "text/css");
});
app.route("get", "/scripts.js", (req, res) => {
  res.status(200, "success").sendFile("./public/scripts.js", "text/javascript");
});

app.route("get", "/login", (req, res) => {
  res.status(200).sendFile("./public/index.html", "text/html");
});

// Json Routes ---
app.route("get", "/api/posts", (req, res) => {
  const newPosts = posts.map((post) => {
    const user = users.find((u) => u.id === post.userId);
    return {
      ...post,
      author: user.name,
    };
  });
  res.status(200, "success").json(newPosts);
});

// Authentiction Routes ---
app.route("post", "/api/login", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  });

  req.on("end", () => {
    body = JSON.parse(body);

    const user = users.find((u) => u.username === body.username);
    if (user && user.password === body.password) {
      const token = Math.floor(Math.random() * 1000000000).toString();
      sessions.push({ userId: user.id, token: token });
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Set-Cookie", `token=${token}; Path=/`);
      res.status(200).json({ message: "login successfully" });
    } else {
      res.status(401).json({ message: "invalid username and password" });
    }
  });
});

app.start({ port, hostname }, () =>
  console.log(`server opened on http://${hostname}:${port}`)
);
