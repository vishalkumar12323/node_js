const fs = require("fs/promises");
const { existsSync } = require("fs");
const commands = {
    CREATE: 'CREATE FILE',
    DELETE: 'DELETE FILE',
    RENAME: 'RENAME FILE',
    EDIT: 'EDIT FILE'
};

(async function () {

    const createFile = async (path) => {
        let fileHandler;
        const isFileExist = existsSync(path);
        try {
            if (!isFileExist) {
                fileHandler = await fs.open(path, 'w');
                console.log(`file ${path} successfully created.`);
            } else {
                throw new Error(`The file ${path} already exist.`)
            }
        } catch (err) {
            console.log(`error while creating file `, err);
            return;
        } finally {
            await fileHandler?.close();
        }
    };

    const renameFile = async (oldName, newName) => {
        const isFileExist = existsSync(oldName);
        try {
            if (isFileExist) {
                await fs.rename(oldName, newName);
            } else {
                throw new Error(`The file ${oldName} not exist`);
            }
        } catch (err) {
            console.log('error while renaming the file ', err);
        };
    };

    const deleteFile = async (file) => {
        const isFileExist = existsSync(file);
        try {
            if (isFileExist) {
                await fs.rm(file);
            } else {
                throw new Error(`The file ${file} not exist`);
            }
        } catch (err) {
            console.log('error while deleting file ', err);
        };
    };

    let existingFileContent;
    const editFile = async (file, content) => {
        let fileHandler;
        const isFileExist = existsSync(file);
        if (existingFileContent === content) return;
        try {
            if (isFileExist) {
                fileHandler = await fs.open(file, 'a');
                await fileHandler.appendFile(content);
                existingFileContent = content;
                return;
            } else {
                throw new Error(`The file ${file} not exist`);
            }
        } catch (err) {
            console.log(`error while editing file `, err);
        } finally {
            fileHandler?.close();
        }
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