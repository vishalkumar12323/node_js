const Express = require("../express-framework/new-express");

const port = 9001,
  hostname = "127.0.0.1";

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

// middleware for handling user authentication.
app.use((req, res, next) => {
  const authenticatRequiredRoutes = [
    "get /api/user",
    "get /api/posts",
    "post /api/posts",
    "put /api/user",
    "delete /api/logout",
  ];

  if (
    authenticatRequiredRoutes.indexOf(
      req.method.toLowerCase() + " " + req.url
    ) !== -1
  ) {
    if (req.headers.cookie) {
      const token = req.headers.cookie?.split("=")[1];
      const session = sessions.find((s) => s.token === token);
      if (session) {
        req.userId = session.userId;
        return next();
      }
    } else {
      res.status(401, "Unauthorized").sendError(`Unauthorized user`);
    }
  } else {
    next();
  }
});

// // middleware for handling json data coming from the client.
app.use((req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf-8");
    });

    req.on("end", () => {
      body = JSON.parse(body);
      req.body = body;
      return next();
    });
  } else {
    next();
  }
});

// middleware for handling static files ['.html', '.css', '.js'];
app.use((req, res, next) => {
  const routes = ["/", "/profile", "/login", "/new-post"];

  if (routes.indexOf(req.url) !== -1 && req.method === "GET") {
    return res.status(200, "ok").sendFile("./public/index.html", "text/html");
  } else {
    next();
  }
});

// File Routes ---
app.route("get", "/styles.css", (req, res) => {
  res.status(200, "success").sendFile("./public/styles.css", "text/css");
});
app.route("get", "/scripts.js", (req, res) => {
  res.status(200, "success").sendFile("./public/scripts.js", "text/javascript");
});

// User profile Route ---
app.route("get", "/api/user", (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  res.status(200, "ok").json({ name: user.name, username: user.username });
});

// Json Routes ---
app.route("get", "/api/posts", (req, res) => {
  const newPosts = posts.map((post) => {
    const user = users.find((u) => u.id === post.userId);
    return {
      ...post,
      author: user?.name,
    };
  });
  res.status(200, "success").json(newPosts);
});

app.route("post", "/api/posts", (req, res) => {
  const { title, body } = req.body;
  if (title && body) {
    const post = {
      id: posts.length + 1,
      title,
      body,
      userId: req.userId,
    };
    posts.unshift(post);
    return res.status(201, "created").json(post);
  }
});

// Authentiction Routes ---
app.route("post", "/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && user.password === password) {
    const token = Math.floor(Math.random() * 1000000000).toString();
    sessions.push({ userId: user.id, token: token });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Set-Cookie", `token=${token}; Path=/`);
    res.status(200).json({ message: "login successfully" });
  } else {
    console.log("body ", req.body);
    res.status(401).json({ message: "invalid username and password" });
  }
});

// Update User Details Routes ---
app.route("put", "/api/user", (req, res) => {
  const { name, username, password } = req.body;

  const user = users.find((user) => user.id === req.userId);
  if (user) {
    user.name = name;
    user.username = username;

    // Only update the password when user provide new password
    if (password) {
      user.password = password;
    } else {
      user.passwordISUpdated = !password ? "password-updated" : "";
    }
    res.status(200).json({ user });
  }
});
// Logout Routes ---
app.route("delete", "/api/logout", (req, res) => {
  const { userId } = req;
  const sessionIndex = sessions.findIndex(
    (session) => session.userId === userId
  );
  sessions.splice(sessionIndex, 1);
  res.setHeader(
    "Set-Cookie",
    "token=deleted; Expires= 1 Jan 1970 00:00:00 GMT; Path=/;"
  );
  res.status(200, "success").json({ message: "successfully logout" });
});
app.start({ port, hostname }, () =>
  console.log(`server opened on http://${hostname}:${port}`)
);
