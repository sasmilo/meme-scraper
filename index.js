const axios = require('axios');
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
  const pageData = page.data; // In pageData variable is the whole HTML page, but in form of a string

  // I've found out that string contained in pageData variable doesn't contain symbol '&'

  const newPageDataString = pageData.replace(/src="/g, '&');
  // Replace all 'src="' string parts with exclusive sign '&' so we can split with '&' later

  const arrayOfDataStrings = newPageDataString.split('&');

  // Now we need to extract strings that begin after '&' and end before '?' and put those strings in an array
  // We observed the links at the string, and all of useful content stands between '&' and first '?' sign
  // Let's try to shorten the strings in this array, in a way that we will cut off all after '?'

  const shortenArrayOfDataStrings = arrayOfDataStrings.map(function (item) {
    return item.slice(0, item.indexOf('?') + 1);
  });

  // Now we got URLs of all meme pictures in the string

  // Now we need to download the actual images to the 'memes' folder

  for (let i = 0; i < 10; i++) {
    const url = shortenArrayOfDataStrings[i + 2];
    if (url.includes('?')) {
      fs.createWriteStream(`./memes/image${i}.jpeg`);
    }
  }
})();
