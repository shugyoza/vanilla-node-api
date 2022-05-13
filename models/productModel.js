// 6 Moved from server.js
const products = require("../data/products");
const {
    writeDataToFile // 16
} = require("../utils")


// 7 Create simple function to return promise, and export it
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

// 13 define and export
function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    })
}

// 15 define and export
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: `${Date.now()}`, ...product};
        products.push(newProduct);
        writeDataToFile("./data/products.json", newProduct);
        resolve(newProduct);
    })
}

module.exports = {
    findAll,
    findById,
    create
}
