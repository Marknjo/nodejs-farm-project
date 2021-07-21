const http = require("http");
const fs = require("fs");
const url = require("url");
//////////////////////////////
/// SERVER

const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(jsonData);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/products") {
    res.end("This is the PRODUCTS");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(jsonData);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000!");
});
