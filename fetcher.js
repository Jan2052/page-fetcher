const fs = require('fs');
const args = process.argv.slice(2)
console.log(args)

let url = args[0]
let localFilePath = args[1]

const request = require('request');
request(url, (error, response, body) => {
  if (error) console.log('Error on HTTP GET Request...', error);
  //  console.log('response', response);
  const { statusCode } = response;
  console.log('status code', statusCode)
  console.log('body', body);
  // if (statusCode === 200) {
  //   const json = JSON.parse(body)
  //   console.log(json)
  // }
  fs.writeFile(localFilePath, body, err => {
    if (err) {
      console.error(err);
    }
  });
}); 
