const fs = require("node:fs/promises");

(async () => {
    console.time("T")
    const readFileHandler = await fs.open('./read.txt', 'r');
    const writeFileHandler = await fs.open("./write.txt", 'w');

    try {
        const readStream = readFileHandler.createReadStream();
        const writeStream = writeFileHandler.createWriteStream();

        readStream.on("data", (chunk) => {
            // console.log(chunk);
            if (!writeStream.write(chunk.toString('utf-8'))) {
                readStream.pause();
            };

        });

        // writeStream.end('h');
        writeStream.on("drain", () => {
            console.log('drained')
            readStream.resume();
        });

        writeStream.on("finish", async () => {
            console.log('steam finish')
            await writeFileHandler.close();
            console.timeEnd("T");
        })


    } catch (err) {
        console.log('error occur: ', err)
    };
})();