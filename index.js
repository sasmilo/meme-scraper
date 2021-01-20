const axios = require('axios');

(async () => {
  const page = await axios.get(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  console.log(page);
})(); // Scrapes the content of the whole page
