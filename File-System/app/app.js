const fs = require("fs/promises");

const commands = {
    CREATE: 'CREATE FILE',
    DELETE: 'DELETE FILE',
    RENAME: 'RENAME FILE',
    EDIT: 'EDIT FILE'
};

(async function () {

    const createFile = async (path) => {
        try {
            const file = await fs.open(path, 'r');
            await file.close();
            console.log(`file ${path} already exist`);
        } catch (err) {
            const file = await fs.open(path, 'w');
            await file.close();
            console.log(`file ${path} was successfully created`);
        }
    };

    const renameFile = async (oldName, newName) => {
        try {
            await fs.rename(oldName, newName);
        } catch (err) {
            console.log('error while renaming the file ', err);
        };
    };

    const deleteFile = async (file) => {
        try {
            await fs.rm(file);
        } catch (err) {
            console.log('error while deleting file ', err);
        };
    };

    const editFile = async (file, content) => {
        try {
            await fs.writeFile(file, content, { encoding: 'utf-8' });
        } catch (err) {
            console.log(`error while editing file `, err);
        };
    };


    const commandFileHandler = await fs.open("./command.txt", "r");
    commandFileHandler.on('change', async () => {
        const size = (await commandFileHandler.stat()).size;
        const buf = Buffer.alloc(size);
        const offset = 0;
        const length = buf.byteLength;
        const position = 0;

        await commandFileHandler.read({ buffer: buf, length, offset, position });
        const content = buf.toString("utf-8");

        let filePath = content.substring(commands.CREATE.length + 1);
        if (content.includes(commands.CREATE)) {
            createFile(filePath);
        } else if (content.includes(commands.RENAME)) {
            const path = filePath.toLowerCase().split(" ");
            renameFile(path[0], path[1]);
        } else if (content.includes(commands.DELETE)) {
            deleteFile(filePath);
        } else if (content.includes(commands.EDIT)) {
            filePath = content.substring(commands.EDIT.length + 1);
            const path = filePath.toLowerCase().split(" ");

            const file = path[0];
            const fileContent = path.slice(1).join(" ");
            editFile(file, fileContent);
        };
    });



    try {
        const watcher = fs.watch("./command.txt");
        for await (const e of watcher) {
            if (e.eventType === "change") {
                commandFileHandler.emit('change');
            }
        };
    } catch (error) {
        console.log('error watching file ', error);
    };
})();