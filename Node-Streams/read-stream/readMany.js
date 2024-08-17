const fs = require("node:fs/promises");

(async () => {
    const readfileHandler = await fs.open('read.txt', 'r');
    const writefileHandler = await fs.open('write.txt', 'w');

    const readStream = readfileHandler.createReadStream();
    const writeStream = writefileHandler.createWriteStream();

    let split = ""
    readStream.on('data', (chunk) => {
        const numbers = chunk.toString("utf-8").split("  ");

        if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
            if (split) numbers[0] = split.trim() + numbers[0].trim();
        };

        if (Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])) {
            split = numbers.pop();
        }

        numbers.forEach(number => {
            let n = Number(number);
            if (n % 2 !== 0) {
                if (!writeStream.write(" " + n + " ")) {
                    // console.log(Number(numbers[numbers.length - 2] + 1));
                    readStream.pause();
                }
            }
        })

    });

    writeStream.on("drain", () => {
        readStream.resume();
    });
})();