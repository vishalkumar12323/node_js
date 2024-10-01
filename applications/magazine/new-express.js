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
      // SendFile method for serve static files to client.
      res.sendFile = async (path, mimeType) => {
        const fileHandler = await fs.open(path, "r");
        const stream = fileHandler.createReadStream();

        res.setHeader("Content-Type", mimeType);
        stream.pipe(res);
      };

      // Status method send to status-code & message in response for the client.
      res.status = (statusCode, message = "") => {
        res.statusCode = statusCode;
        res.statusMessage = message;
        return res;
      };

      // Json method used for sending json data as response to the client.
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      // Send an error back to the client.
      res.sendError = (message) => {
        res.end(message);
      };

      // call the all middleware function in req, res cycle.
      const runMiddleware = (req, res, middleware, idx) => {
        if (idx === middleware.length) {
          if (!this.routes[req.method.toLowerCase() + req.url]) {
            // console.log("run........");
            return res
              .status(404, "Not-Found")
              .sendError(`Cannot get ${req.method} ${req.url}`);
          } else {
            this.routes[req.method.toLowerCase() + req.url](req, res);
          }
        } else {
          this.middleware[idx](req, res, () => {
            runMiddleware(req, res, middleware, idx + 1);
          });
        }
      };

      runMiddleware(req, res, this.middleware, 0);
    });
  }

  route(method = "", path = "", cb) {
    this.routes[method.toLowerCase() + path] = cb;
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
