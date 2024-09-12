const { Readable } = require("node:stream");
const fs = require("node:fs");

class ReadableStream extends Readable {
  constructor({ fileName, highWaterMark }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }

  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) {
        return this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
      }
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
      callback(err);
    }
  }
}

const stream = new ReadableStream({ fileName: "read.txt" });

stream.on("data", (chunk) => {
  console.log(chunk.toString("utf-8"));
});

stream.on("end", () => {
  console.log("stream done reading");
});
