const http = require("http");

// Prints Hello World in the browser
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html")
    res.write("<h1>Hello World</h1>")
    res.end;
});
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
