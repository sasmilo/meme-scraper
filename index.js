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
  pageData = page.data; // In pageData variable is the whole HTML page, but in form of a string
  //console.log(pageData);

  //console.log(pageData.includes('&')); // That's false, so I've found out that string contained in pageData
  //doesn't contain symbol '&'

  const newPageDataString = pageData.replace(/src="/g, '&');
  //Replace all 'src="' string parts with exclusive sign '&' so we can split with '&' later

  //console.log(newPageDataString); // Just to prove it works

  const arrayOfDataStrings = newPageDataString.split('&');
  //console.log(arrayOfDataStrings);

  //Now we need to extract strings that begin after '&' and end before '?' and put those strings in an array
  //We observed the links at the string, and all of useful content stands between '&' and first '?' sign
  //Let's try to shorten the strings in this array, in a way that we will cut off all after '?'
  const shortenArrayOfDataStrings = arrayOfDataStrings.map(function (
    item,
    index,
  ) {
    return item.slice(0, item.indexOf('?') + 1);
  });

  // Now we got URLs of all meme pictures in the string
  //console.log(shortenArrayOfDataStrings); // Just to prove it works

  //Now we need to download the actual images to the 'memes' folder

  //for (const imgUrls of shortenArrayOfDataStrings) {
  //console.log(typeof imgUrls);

  //Right here we have turned URL strings into an actual URLs

  for (let i = 0; i < 10; i++) {
    const url = shortenArrayOfDataStrings[i + 2];
    if (url.includes('?')) {
      const file = fs.createWriteStream(`./memes/image${i}.jpeg`);
      const request = https.get(url, function (response) {
        response.pipe(file);
      }); //);});
    }
  }
  //}
})();
