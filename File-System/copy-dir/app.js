const fs = require("fs");
const EventEmmiter = require("events");



const event = new EventEmmiter();

event.on("change", () => {
    console.log('run.')
});

const init = () => {
    const dir = fs.watch("./input", { recursive: true });
};

init();