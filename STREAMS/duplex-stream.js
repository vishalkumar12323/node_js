const { Duplex } = require("node:stream");
const fs = require("node:fs");

class DuplexStream extends Duplex {
    constructor({ readableHighWaterMark, writableHighWaterMark, readFilename, writeFilename }) {
        super({ readableHighWaterMark, writableHighWaterMark });
        this.readFilename = readFilename;
        this.writeFilename = writeFilename;
        this.readFd = null;
        this.writeFd = null;
        this.chunks = [];
        this.chunkSize = 0
    }

    _construct(callback) {
        fs.open(this.readFilename, 'r', (err, fd) => {
            if (err) return callback(err);
            this.readFd = fd;
            callback();
        });

        fs.open(this.writeFilename, "w", (err, fd) => {
            if (err) return callback(err);
            this.writeFd = fd;
            callback();
        });
    };

    _read(size) {
        const buff = Buffer.alloc(size);
        fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
            if (err) {
                return this.destroy(err);
            } else {
                this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
            };
        });
    };

    _write(chunk, encoding, callback) {
        this.chunks.push(chunk);
        this.chunkSize += chunk.length;

        if (this.chunkSize > this.writableHighWaterMark) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    return callback(err);
                } else {
                    this.chunks = [];
                    this.chunkSize = 0;
                    callback();
                }
            })
        } else {
            callback();
        }
    };

    _final(callback) {
        if (this.writeFd) {
            fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
                if (err) return callback(err);
                callback()
            });
        };
    };

    _destroy(err, callback) {
        if (this.readFd) {
            fs.close(this.readFd, (er) => callback(er || err));
            callback(err);
        };

        if (this.writeFd) {
            fs.close(this.writeFd, (er) => callback(er || err));
            callback();
        };
    };
};

const duplex = new DuplexStream();