const fs = require("fs");
const path = require("path");

// Read Dir
const files = fs.readdirSync("./");
// console.log(files);

fs.readdir("./", function (err, files) {
  if (err) console.log("Error is ", err);
  else console.log("Result ", files);
});

// Create folder
const folder = path.join(__dirname, "/test");
if (!fs.existsSync) {
  fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
    if (err) throw err;
    console.log("Folder Created...");
  });
}

// Create and write to file
fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "Hello World....!",
  (err) => {
    if (err) throw err;
    console.log("File written to...");

    // File Append
    fs.appendFile(
      path.join(__dirname, "/test", "hello.txt"),
      " I love Node js",
      (err) => {
        if (err) throw err;
        console.log("File Appended To");
      }
    );
  }
);

// Read File
fs.readFile(path.join(__dirname, "/test", "hello.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log("Reading File Data ..... \n", data);
});

// Rename File
fs.rename(
  path.join(__dirname, "/test", "hello.txt"),
  path.join(__dirname, "/test", "helloNew.txt"),
  (err) => {
    if (err) throw err;
    console.log("File Renamed...");
  }
);
