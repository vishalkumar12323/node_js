const { pipeline } = require("node:stream").promises;
const { createReadStream, createWriteStream } = require("node:fs");
const zlib = require("node:zlib");

class FileZipper {
  constructor({ readableHighWaterMark, writableHighWaterMark, encoding }) {
    this.readableHighWaterMark = readableHighWaterMark || 16 * 1024;
    this.writableHighWaterMark = writableHighWaterMark || 16 * 1024;
    this.encoding = encoding || "utf-8";
  }

  async compress({ sourcePath, destPath }) {
    const source = createReadStream(sourcePath, {
      encoding: this.encoding,
      highWaterMark: this.readableHighWaterMark,
    });
    const destination = createWriteStream(destPath, {
      encoding: this.encoding,
      highWaterMark: this.readableHighWaterMark,
    });
    return await pipeline(source, zlib.createGzip(), destination);
  }

  async decompress({ sourcePath, destPath }) {
    const source = createReadStream(sourcePath, {
      highWaterMark: this.readableHighWaterMark,
    });
    const destination = createWriteStream(destPath, {
      encoding: this.encoding,
      highWaterMark: this.writableHighWaterMark,
    });
    return await pipeline(source, zlib.createUnzip(), destination);
  }
}

module.exports = { FileZipper };
