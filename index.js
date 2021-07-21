const http = require('http');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');
//////////////////////////////
/// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(jsonData);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  //const pathName = req.url;

  const { searchParams: query, pathname: pathName } = new URL(
    req.url,
    'http://localhost:8000/'
  );

  //overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8',
    });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(output);

    //Single Product page
  } else if (pathName === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8',
    });

    const product = dataObj[query.get('id')];
    const productHtml = replaceTemplate(tempProduct, product);

    res.end(productHtml);

    //API page
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(jsonData);

    //Not Found page
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'Hello-world',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000!');
});
