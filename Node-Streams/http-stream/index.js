const { createServer } = require("node:http");
const fs = require("node:fs/promises");


let data = "";
const writeData = async () => {
    const fileHandler = await fs.open('index.html', 'r');
    const readStream = fileHandler.createReadStream();
    readStream.on("data", (chunk) => {
        data += chunk.toString("utf-8");
    });

    readStream.on("end", async () => {
        await fileHandler.close();
    });

    return data;
}
const server = createServer(async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const data = await writeData();
    res.end(data);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
