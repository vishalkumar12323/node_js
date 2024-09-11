const fs = require("fs/promises");
const stream = require("node:stream");

(async () => {
    const fileHandler = await fs.open('../read-stream/read.txt', 'r');
    const readStream = fileHandler.createReadStream();
    const writeStream = new stream.Writable({
        write: function (chunk, encoding, next) {
            console.log(chunk.toString())
            next();
        }
    });

    writeStream.write("hello the data is data");

    writeStream.cork();
    readStream.on("data", (chunk) => {
        writeStream.write(chunk)
        // if (!writeStream.write(chunk)) {
        //     readStream.pause();
        // }
    })

    // writeStream.on("drain", () => {
    //     readStream.resume();
    // })
    process.nextTick(() => writeStream.uncork());
})();