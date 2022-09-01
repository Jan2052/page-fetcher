const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let url = process.argv[2];
let localFilePath = process.argv[3];

const request = require('request');
request(url, (error, response, body) => {
  if (error) {
    console.log('Error on HTTP GET Request...', error);
    return;
  }

  if (response && response.statusCode !== 200) {
    console.log(`Status code: ${response.statusCode}`);
    return;
  }

  const writefile = function() {
    fs.writeFile(localFilePath, body, err => {
      if (err) throw err;
      console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
    });
  };

  if (!fs.existsSync(localFilePath)) {
    writefile();
    rl.close();
  }

  rl.question('File already exists. Replace existing file? (y/n)', (answer) => {
    if (answer === "n") {
      console.log("File was not downloaded");
      rl.close();
    } else if (answer === "y") {
      writefile();
      rl.close();
    } else {
      console.log('Invalid Input');
      rl.close();
    }
  });
});