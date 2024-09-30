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
    this.middleware = [];

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

      this.middleware[0](req, res, () => {
        this.middleware[1](req, res, () => {
          this.middleware[2](req, res, () => {
            this.routes[req.method.toLowerCase() + req.url](req, res);
          });
        });
      });

      const recursiveRun = () => {
        const n = this.middleware.length;
        if (n === this.middleware.length) {
          this.routes[req.method.toLowerCase() + req.url](req, res);
        } else {
          this.middleware[n + 1](req, res, () => {});
        }
      };
    });
  }

  route(method = "", path = "", cb) {
    this.routes[method + path] = cb;
  }

  use(cb) {
    this.middleware.push(cb);
  }
  start({ port, hostname }, cb) {
    this.app.listen(port, hostname, () => {
      cb();
    });
  }
}

module.exports = Express;
