// 16 to read file system
const fs = require("fs");

// 16
function writeDataToFile(filename, content) {
    // method to write to json synchronously, passing the file name, stringified content, encoding type, and err callback
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
        if (err) console.log(err);
    })
}

module.exports = {
    writeDataToFile // 16
}
