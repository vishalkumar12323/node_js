const Emmiter = require("events");

class EventEmmiter extends Emmiter {

};

const e = new EventEmmiter();

e.once("foo", () => {
    console.log("only once time run.")
});
e.on("foo", () => {
    console.log("running first foo event");
});

e.on("foo", () => {
    console.log('running second foo event');
});

e.on("foo", (x) => {
    console.log("running third event with parameter: ", x);
});


e.emit("foo")
// e.emit("foo", "EventEmmiter");
// console.log(e.listenerCount("foo"));
// e.on("error", (err) => {
//     console.log("An error occurd ", err);
// });
// e.emit("error", "something went wrong.");