const http = require("http");
const products = require("./data/products");

/*
// 1. Prints Hello World in the browser
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html")
    res.write("<h1>Hello World</h1>")
    res.end;
});
*/

/*
// 2. Returns json on any request method and endpoint
const server = http.createServer((req, res) => {
    // summarize res.statusCode and res.setHeader together
    res.writeHead(200, {"Content-type": "application/json"});
    // will come out with just a regular js array, thus we have to stringify
    res.write(JSON.stringify(products));
    res.end;
});
*/

/*
// 3 Returns json on any request method and endpoint
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-type": "application/json"});
    // res.write then res.end could be summarized into just res.end
    res.end(JSON.stringify(products));
})
*/

/*
// 4 Returns products on /api/products, and not found on others, on ANY request method.
const server = http.createServer((req, res) => {
    if (req.url === "/api/products") {
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(products));
    } else {
        res.writeHead(404, {"Content-type": "application/json"});
        res.end(JSON.stringify({message: "Route Not Found"}));
    }
})
*/

// 5 Returns products on /api/products, and not found on others, on GET request method.
const server = http.createServer((req, res) => {
    if (req.url === "/api/products" && req.method === "GET") {
        res.writeHead(200, {"Content-type": "application/json"}).end(JSON.stringify(products));
    } else {
        res.writeHead(404, {"Content-type": "application/json"}).end({message: "Route Not Found"})
    }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

/* we can access request query this way
const url = require("url")
const parsedURL = url.parse(req.url, true);
console.log(parsedURL.query.id)
*/
