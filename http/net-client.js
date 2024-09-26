const net = require("node:net");

const client = net.createConnection({ port: 4050, host: "::1" }, () => {
  const head = Buffer.from(
    "504f5354202f63726561746520485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a436f6e6e656374696f6e3a20636c6f73650d0a486f73743a205b3a3a315d3a343035300d0a436f6e74656e742d4c656e6774683a2032350d0a0d0a",
    "hex"
  );

  const body = Buffer.from(
    "7b226e616d65223a2264616c6579222c22616765223a32357d",
    "hex"
  );
  client.write(Buffer.concat([head, body]));
});

client.on("data", (chunk) => {
  console.log("data Received");
  console.log(chunk.toString("utf-8"));

  client.end();
});

client.on("end", () => {
  console.log("connection ended.");
});

/*

504f5354202f63726561746520485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a436f6e6e656374696f6e3a20636c6f73650d0a486f73743a205b3a3a315d3a343035300d0a436f6e74656e742d4c656e6774683a2032350d0a0d0a


0000   7b 22 6e 61 6d 65 22 3a 22 64 61 6c 65 79 22 2c   {"name":"daley",
0010   22 61 67 65 22 3a 32 35 7d                        "age":25}


7b226e616d65223a2264616c6579222c22616765223a32357d

*/
