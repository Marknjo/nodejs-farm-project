const http = require("http");
const url = require("url");
//////////////////////////////
/// SERVER

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/products") {
    res.end("This is the PRODUCTS");
  } else {
    res.writeHead(404, {
      "Conctent-Type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000!");
});
