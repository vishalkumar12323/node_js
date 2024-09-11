const fs = require("node:fs");

// Synchronous Operation.
// Result:
// TIME uses: 34s-35s
// CPU uses: 100%(1 core)
// MEMORY uses: 30mb-35mb
console.time("Time ");

const fd = fs.openSync("./text.txt", "w");
for (let i = 0; i <= 1000000; i++) {
    fs.writeSync(fd, ` ${i} `);
};
fs.closeSync(fd);

console.timeEnd("Time ");


// Callback Operation.
// Result:
// TIME uses: 18s-20s
// CPU uses: 100%(1 core)
// MEMORY uses: 900mb-1GB
console.time("Time ");
fs.open('./text.txt', "w", (err, fd) => {
    console.time("Time ");
    for (let i = 0; i <= 1000000; i++) {
        // fs.writeSync(fd, ` ${i} `); optional
        fs.write(fd, ` ${i} `, (err) => { });
    };
    console.timeEnd("Time ");
});




const fs = require("node:fs/promises");
// Asynchronous Operation.
// Result:
// TIME uses: 8s-9s
// CPU uses: 100%(1core)
// MEMORY uses: 25mb-30mb

(async () => {
    console.time("Time ");
    const fileHandler = await fs.open('./text.txt', 'w');
    try {
        for (let i = 0; i <= 1000000; i++) {
            await fileHandler.write(` ${i} `);
        };
    } catch (err) {
        console.log(`err occur while writing file `, err);
    } finally {
        console.timeEnd("Time ");
        await fileHandler.close();
    }
})();
