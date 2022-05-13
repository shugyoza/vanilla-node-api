// 8
const Product = require("../models/productModel")

// 9 moved from server.js if else
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(products))
    } catch (err) {
        console.log(err)
    }
}

// 12 define and export for /api/products/id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Product Not Found"}))
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(product))
        }
    } catch (err) {
        console.log(err);
    }
}

// 14 define and export for POST to /api/products/
async function createProduct(req, res) {
    try {
        const product = {
            title: "Test Product",
            description: "This is my product",
            price: 100
        }
        const newProduct = Product.create(product);
        res.writeHead(201, {"Content-Type": "application/json"})
        return res.end(JSON.stringify(newProduct));
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getProducts,
    getProduct
}
