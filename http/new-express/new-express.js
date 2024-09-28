const http = require("node:http");
const fs = require("node:fs/promises");

class Express {
  constructor() {
    this.app = http.createServer();
    /**
     * routes = {
     *  "GET/home": () => {},
     *  "POST/create": () => {},
     * }
     */
    this.routes = {};

    this.app.on("request", (req, res) => {
      res.sendFile = async (path, mimeType) => {
        const fileHandler = await fs.open(path, "r");
        const stream = fileHandler.createReadStream();

        res.setHeader("Content-Type", mimeType);
        stream.pipe(res);
      };

      res.status = (statusCode, message = "") => {
        res.statusCode = statusCode;
        res.statusMessage = message;
        return res;
      };
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      res.sendError = (message) => {
        res.end(message);
      };
      if (!this.routes[req.method.toLowerCase() + req.url]) {
        return res
          .status(404, "Not-Found")
          .sendError(`Cannot get ${req.method} ${req.url}`);
      }
      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }

  route(method = "", path = "", cb) {
    this.routes[method + path] = cb;
  }

  start({ port, hostname }, cb) {
    this.app.listen(port, hostname, () => {
      cb();
    });
  }
}

module.exports = Express;
