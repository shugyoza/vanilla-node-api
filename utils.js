// 16 to read file system
const fs = require("fs");

// 16
function writeDataToFile(filename, content) {
    // method to write to json synchronously, passing the file name, stringified content, encoding type, and err callback
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
        if (err) console.log(err);
    })
}

// 17 define a callback to grab values from body
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body)
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    writeDataToFile, // 16
    getPostData // 17
}
