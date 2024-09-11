const fs = require('node:fs/promises');

(async () => {
    console.time("T")
    const srcFile = await fs.open("read.txt", 'r');
    const destFile = await fs.open('copied.txt', 'w');

    let readByte = -1
    while (readByte !== 0) {
        const result = await srcFile.read();
        readByte = result.bytesRead;
        destFile.write(buff, 0, buff.length, null);
        if (readByte !== 16384) {

            const indexNotfilled = result.buffer.indexOf(0);
            const newBuffer = Buffer.alloc(indexNotfilled);
            await destFile.write(newBuffer, 0, 0,);
        } else {
            await destFile.write(result.buffer);
        }
    }
    console.timeEnd("T");
})();