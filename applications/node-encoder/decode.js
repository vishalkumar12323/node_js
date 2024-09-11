const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Decrypt extends Transform {
    // constructor({ }) {
    //     super();
    // };
    _transform(chunks, encoding, callback) {
        console.log(chunks);
        console.log(chunks.toString('utf-8'));
        for (let i = 0; i < chunks.length; i++) {
            if (chunks[i] !== 255) chunks[i] -= 1;
        };
        console.log(chunks);
        console.log(chunks.toString('utf-8'));
        callback(null, chunks);
    };
};

(async () => {
    const decrypter = new Decrypt();
    const readFileHandler = await fs.open('write.txt', 'r');
    const writeFileHandler = await fs.open("dest.txt", 'w');

    const readStream = readFileHandler.createReadStream();
    const writeStream = writeFileHandler.createWriteStream();

    readStream.pipe(decrypter).pipe(writeStream);
})();
