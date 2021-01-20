const request = require('request'); // import library called request

request(
  {
    uri: 'https://memegen-link-examples-upleveled.netlify.app/',
  },
  function (error, response, body) {
    console.log(body);
  },
); // This fetches the desired HTML code to the console log, and the whole page is a string that is in the variable called body
