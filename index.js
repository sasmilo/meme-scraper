const axios = require('axios');
const https = require('https');
const fs = require('fs');

try {
  if (!fs.existsSync('./memes')) {
    fs.mkdirSync('./memes');
  }
} catch (err) {
  console.error(err);
}
// Creating a new folder for saving the loaded images

(async () => {
  const page = await axios.get(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const pageData = page.data; // In pageData variable is the whole HTML page, but in form of a one huge string

  const arrayOfDataStrings = pageData.split(/src="/g);
  // Here we made an array of strings by splitting pageData by part src=" , which comes before every photo
  // Every element of this array starts with the URL of the desired meme and after that
  // there is plenty of stuff we don't need. What we need ends with the first '&' sign.
  // Let's try to shorten the strings in this array, in a way that we will cut off all after the first '?'
  const shortenArrayOfDataStrings = arrayOfDataStrings.map(function (item) {
    return item.slice(0, item.indexOf('?') + 1);
  });

  // Now we got URLs of all meme pictures in the array.

  // Now we need to download the actual images to the 'memes' folder

  // Right here we have turned URL strings into an actual URLs

  for (let i = 2; i < 12; i++) {
    const url = shortenArrayOfDataStrings[i];
    if (url.includes('?')) {
      const file = fs.createWriteStream(`./memes/image${i - 1}.jpeg`);
      const request = https.get(url, function (response) {
        response.pipe(file);
      });
      if (request === {}) {
        console.log(
          `Uh-oh! There's been some mistake! Please check the source page.`,
        );
      }
    }
  }
  console.log(
    `Look up for the folder called 'memes' in the root folder and have fun!`,
  );
})();
