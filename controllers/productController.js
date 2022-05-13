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

module.exports = {
    getProducts
}
