// 8
const Product = require("../models/productModel");
const {getPostData} = require("../utils");

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

/*
// 14 define and export for POST to /api/products/
async function createProduct(req, res) {
    try {
        const product = {
            title: "Test Product",
            description: "This is my product",
            price: 100
        }
        const newProduct = await Product.create(product);
        res.writeHead(201, {"Content-Type": "application/json"})
        return res.end(JSON.stringify(newProduct));
    } catch (err) {
        console.log(err)
    }
} */

/*
// 17 refactor the abovementioned 14 to be able to take input from body
// // we cannot use req.body method available on Express
async function createProduct(req, res) {
    try {
        let body = "";
        req.on("data", (chunk) => {
            // end up with buffer we need to convert into a string
            console.log(chunk, chunk.toString());
            body += chunk.toString()
        });

        req.on("end", async () => {
            // grab the values from parsed body
            const { title, description, price } = JSON.parse(body);
            // create the new product
            const product = {
                title,
                description,
                price
            }

            const newProduct = await Product.create(product);
            res.writeHead(201, { "Content-Type": "application/json"});
            res.end(JSON.stringify(newProduct));
        })

    } catch (err) {
        console.log(err);
    }
} */

// 18 refactor from abovementioned 17, by moving the grabbing the body lines into a separate callback
async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        const {title, description, price} = JSON.parse(body);
        const product = {title, description, price};
        const newProduct = await Product.create(product);
        res.writeHead(201, {"Content-Type": "application/json"});
        res.end(JSON.stringify(newProduct));
    } catch(err) {
        console.log(err);
    }
}

// 19 /api/products/id
async function updateProduct(req, res, id) {
    try {
        const doc = await Product.findById(id);
        if (!doc) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Product Not Found"}));
        } else {
            const body = await getPostData(req);
            const {title, description, price} = JSON.parse(body);
            const updated = {
                title: title || doc.title,
                description: description || doc.description,
                price: price || doc.price
            }
            const updatedProduct = await Product.update(id, updated);
            // status 204 will NOT return anything!
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(updatedProduct));
        }
    } catch (err) {
        console.log(err);
    }
}

// 20
async function deleteProduct(req, res, id) {
    try {
        const doc = await Product.findById(id);
        if (!doc) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Product Not Found"}));
        } else {
            const deletedProduct = await Product.deleteOne(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(deletedProduct));
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct, // 19
    deleteProduct // 20
}
