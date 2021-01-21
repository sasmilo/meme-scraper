const axios = require('axios');

(async () => {
  const page = await axios.get(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  pageData = page.data; // In pageData variable is the whole HTML page, but in form of a string
  //console.log(pageData);

  //console.log(pageData.includes('&')); // I've found out that string contained in pageData
  //doesn't contain symbol '&'

  const newPageDataString = pageData.replace(/src="/g, '&');
  //Replace all 'src="' with exclusive sign '&' so we can split with '&'

  //console.log(newPageDataString); // Just to prove it works

  const arrayOfDataStrings = newPageDataString.split('&');
  //console.log(arrayOfDataStrings);

  //Now we need to extract strings that begin after '&' and end before '?' and put those strings in an array

  const shortenArrayOfDataStrings = arrayOfDataStrings.map(function (
    item,
    index,
  ) {
    return item.slice(0, item.indexOf('?') + 1);
  });
  //Let's try to shorten the strings in this array, in a way that we will cut off all after '?'
  // Now we got URLs of all meme pictures
  //console.log(shortenArrayOfDataStrings); // Just to prove it works
})();
