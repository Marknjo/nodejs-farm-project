const fs = require("fs");

//Blocking synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);

console.log("File output file written...");
console.log("\n");

//Non-blocking asyncronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) throw err;

  console.log(data);
});

console.log("Will read file!");

console.log("\n");

const checkErr = (err) => {
  if (err) throw err;
};

fs.readFile("./txt/start.txt", "utf-8", (err, fileName) => {
  checkErr(err);

  fs.readFile(`./txt/${fileName}.txt`, "utf-8", (err, data) => {
    checkErr(err);
    console.log(data);

    fs.readFile("./txt/append.txt", "utf-8", (err, appendTxt) => {
      checkErr(err);
      console.log(appendTxt);
      console.log("Your file has been written");

      fs.writeFile(
        "./txt/final.txt",
        `${data}\n${appendTxt}`,
        "utf-8",
        (err) => {
          checkErr(err);

          fs.readFile("./txt/final.txt", "utf-8", (err, mergedText) => {
            checkErr(err);

            console.log(mergedText);
          });
        }
      );
    });
  });
});
