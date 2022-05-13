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

// 2.
const server = http.createServer((req, res) => {
    // summarize res.statusCode and res.setHeader together
    res.writeHead(200, {"Content-type": "application/json"});
    // will come out with just a regular js array, thus we have to stringify
    res.write(JSON.stringify(products));
    res.end;
})


const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
