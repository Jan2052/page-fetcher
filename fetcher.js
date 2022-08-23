const fs = require('fs');

let url = process.argv[2];
let localFilePath = process.argv[3];

const request = require('request');
request(url, (error, response, body) => {
  if (error) console.log('Error on HTTP GET Request...', error);
  //  console.log('response', response);
  const { statusCode } = response;
  if (statusCode && statusCode !== 200){
    console.log(`Status code: ${statusCode}`)
  }
  // console.log('status code', statusCode);
  // console.log('body', body);
  // if (statusCode === 200) {
  //   const json = JSON.parse(body)
  //   console.log(json)
  // }
  fs.writeFile(localFilePath, body, err => {
    if (err) throw err;
    console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
  });
});