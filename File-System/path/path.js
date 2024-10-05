const path = require("node:path");
const fs = require("node:fs");

// PATH.BASENAME()
// const dirPath = path.join(__dirname);
// console.log(dirPath);
// fs.readdirSync(dirPath).forEach((file) => {
//   if (fs.statSync(file).isDirectory()) return;
//   // console.log(file);
//   if (path.extname(file) === ".ts") {
//     console.log(path.basename(file));
//   }
// });

// PATH.DIRNAME()
// const name = { path: "/user/bin/index.ts" };
// console.log(path.dirname(name.path));

// PATH.EXTNAME()
// console.log(path.extname("/user/bin/index.ts"));
// console.log(path.extname("/user/bin.tar/index"));
// console.log(path.extname("/user/bin/index.tar.jsx"));

// PATH.FORMAT()
// const psx = {
//   dir: "C:\\user\\bin",
//   base: "file.sh",
// };
// console.log(
//   path.format({
//     root: "C:",
//     dir: "\\Users\\bin",
//     base: "file.tar",
//   })
// );

// PATH.MATCHGLOB()
// console.log(path.matchesGlob("/user/etc", "/user/*")); // true

// PATH.ISABSOLUTE()
// console.log(path.isAbsolute("C:\\users\\vishal")); // true
// console.log(path.isAbsolute("index.html")); // false

// PATH.NORMALIZE()
// console.log(path.normalize("C:\\foo\\bar\\\\\\\\baz.tar")); //C:\foo\bar\baz.tar

// PATH.PARSE()
// console.log(path.parse("\\Users\\vishal\\Desktop\\Coding\\node_js\\app.js"));
// console.log(path.parse("/user/bin/test.jpg"));
// console.log(path.parse("user\\lib\\home.tar"));

// PATH.RELATIVE()
// console.log(path.relative("/user/lib/test.ts", "/user/lib/form/test.js"));
// console.log(path.relative("/user/lib/test.ts", "/lib/form/test.js"));

// PATH.RESOLVE()
// console.log(path.resolve());
// console.log(path.resolve("./../app/app.js"));
// console.log(path.isAbsolute(path.resolve("../app/app.js")));

// PATH.TONAMESPACEDPATH()
// console.log(path.toNamespacedPath("/"));
