// 6 Moved from server.js
let products = require("../data/products.json");
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
        products = [...products, newProduct];
        writeDataToFile("./data/products.json", products);
        resolve(newProduct);
    })
}

// 19
function update(id, updateObj) {
    return new Promise((resolve, reject) => {
        const idx = products.findIndex((p) => p.id === id);
        products[idx] = {id, ...updateObj}
        writeDataToFile("./data/products.json", products);
        resolve(products[idx]);
    })
}

// 20
function deleteOne(id) {
    return new Promise((resolve, reject) => {
        const idx = products.findIndex((p) => p.id === id);
        const deleted = products.splice(idx, 1)[0];
        writeDataToFile("./data/products.json", products);
        resolve(deleted);
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update, // 19
    deleteOne // 20
}
