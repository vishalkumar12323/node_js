const { Buffer } = require("buffer");

// const buff = Buffer.alloc(0.5e9);
// buff[0] = 0xf3;
// buff[1] = 0xb2;
// buff[2] = 0x43;
// buff[3] = 0x93;
// buff[4] = 0xc3;

// setInterval(() => {
//     // for (let i = 0; i < buff.length; i++) {
//     //     buff[i] = 0xf4;
//     // };

//     buff.fill(0xf5);
// }, 5000)

// const buf1 = Buffer.allocUnsafe(10);
// console.log(buf1);

// const buf2 = Buffer.from([257, 257.5, -255, '2']);
// console.log(buf2);


const buf3 = Buffer.from([0x63, 0x72, 0x65, 0x61])
console.log(buf3.toString("utf-8"));

// 0010 1100 0101 0011