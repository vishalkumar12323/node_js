/* Using Promises Method */
const fs = require("fs/promises");
fs.copyFile("./command.txt", "./promises-command.txt").then(() => {
    console.log('successfully copied');
}).catch((e) => {
    console.log('error copying file ', e);
});

/* Using Callback Method */
const fs = require("fs");
fs.copyFile("./command.txt", "./callback-command.txt", (err) => {
    if (err) console.log('error copying file ', err);
});

// /* Using Synchronous Method */
const fs = require("fs");
fs.copyFileSync("./command.txt", "./sync-command.txt");