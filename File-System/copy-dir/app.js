const fs = require("fs");
const Event = require("events");
const path = require("path");

const event = new Event();

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

console.log('out dir ', outputDir);
const copyDir = (src, destination) => {
    if (!fs.existsSync(destination)) {
        console.log('run block');
        fs.mkdirSync(src, { recursive: true });
    };
    fs.readdirSync(src, { recursive: true }).forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(destination, item);
        // console.log('srcPath ', srcPath);
        // console.log('dest path ', destPath);
        if (fs.lstatSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else if (fs.lstatSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
        }
    });
};


event.on("change", () => {
    // fs.rmSync(outputDir, { recursive: true, force: true });
    copyDir(inputDir, outputDir);
});

const init = () => {
    fs.watch("./input", { recursive: true }, (eventType, filename) => {
        if (filename) {
            event.emit("change");
        }
    });
};

copyDir('./input', './output');
init();