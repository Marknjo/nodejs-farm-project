const http = require("http");
const fs = require("fs");
const url = require("url");
//////////////////////////////
/// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(jsonData);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //overview page
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");

    //Single Product page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    //API page
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(jsonData);

    //Not Found page
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
