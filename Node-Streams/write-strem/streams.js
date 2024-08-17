const fs = require("fs/promises");
console.time('T');
(async function () {
    const fileHandler = await fs.open('./one.txt', 'w');
    const stream = fileHandler.createWriteStream();
    let i = 0;
    const writeData = () => {
        while (i < 1000000) {
            const buff = Buffer.from(` ${i} `, 'utf-8');
            if (i === 1000000 - 1) return stream.end();
            if (!stream.write(buff)) break;
            i++;
        };
    };
    writeData();

    let n = 0;
    stream.on("drain", () => {
        console.log('drained ', n++);
        writeData();
    });
    stream.on('finish', async () => {
        console.log(stream.writableHighWaterMark);
        console.timeEnd("T");
        await fileHandler.close();
    });
})();