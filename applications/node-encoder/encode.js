const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Encrypt extends Transform {
    constructor({ fileSize }) {
        super();
        this.fileSize = fileSize;
        this.uploadedSize = 0;
        this.previousPercentageSize = 0;
    };

    _transform(chunk, encoding, callback) {
        this.uploadedSize += chunk.length;

        const percentage = Math.floor((this.uploadedSize / this.fileSize) * 100);

        if (percentage >= this.previousPercentageSize) {
            console.log(percentage === 100 ? 'uploaded...' + percentage + '%' : `uploading...${percentage}%`);
            this.previousPercentageSize = percentage
        }

        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] !== 255) chunk[i] += 1;
        };
        callback(null, chunk);
    };
};


(async () => {
    const readFileHandler = await fs.open('read.txt', 'r');
    const writeFileHandler = await fs.open('write.txt', 'w');
    const fileSize = (await readFileHandler.stat()).size;
    const encrypter = new Encrypt({ fileSize });


    const readStream = readFileHandler.createReadStream({ highWaterMark: 2048 });
    const writeStream = writeFileHandler.createWriteStream();


    readStream.pipe(encrypter).pipe(writeStream);
})();