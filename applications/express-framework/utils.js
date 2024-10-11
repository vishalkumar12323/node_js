const path = require("node:path");

function getType(filename) {
  const extName = path.extname(filename);
  let type = "";
  switch (extName) {
    case ".html": {
      type = "text/html";
      break;
    }
    case ".css": {
      type = "text/css";
      break;
    }
    case ".js": {
      type = "text/javascript";
      break;
    }
    case ".txt": {
      type = "text/plain-text";
      break;
    }
    case ".png": {
      type = "image/png";
      break;
    }
    case ".jpg": {
      type = "image/jpg";
      break;
    }
    case ".jpeg": {
      type = "image/jpeg";
      break;
    }
    default: {
      type = "application/json";
    }
  }

  return type;
}

module.exports = { getType };
