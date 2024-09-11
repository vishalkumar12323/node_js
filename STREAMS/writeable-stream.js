const { Writable } = require("node:stream");
const fs = require("node:fs");

class WriteAbleStream extends Writable {
    constructor({ highWaterMark, fileName }) {
        super({ highWaterMark });
        this.fileName = fileName;
        this.fd = null;
        this.chunks = [];
        this.chunkSize = 0;
    }

    _construct(callback) {
        fs.open(this.fileName, "w", (err, fd) => {
            if (err) {
                callback(err)
            } else {
                this.fd = fd;
                callback();
            }
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

    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    };

    _final(callback) {
        if (this.fd) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            })
        }
    }
};


const stream = new WriteAbleStream({ fileName: 'text.txt' });

let i = 0;
function writeData() {
    while (i < 1000000) {
        const buff = Buffer.from(` ${i} `, "utf-8");

        if (i === 1000000 - 1) return stream.end("vishal");

        if (!stream.write(buff)) break;
        i++;
    }
};
writeData();
let j = 0;
stream.on("drain", () => {
    // console.log(j++);
    writeData();
});

stream.on("finish", () => {
    console.log('stream finish.')
});


