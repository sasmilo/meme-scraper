const axios = require('axios');
const { parse } = require('node-html-parser');

(async () => {
  const page = await axios.get(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const pageData = page.data; // In pageData variable is the whole HTML page, but in form of a string
  //console.log(pageData);

  const dom = parse(pageData);
  const img = dom.querySelector('.images'); // Should extract all src links that belong to the images
  //const img = [];
  //img = pageData.querySelector('img');
  //console.log(dom);
  //console.log(pageData);
  //console.log(img);
  console.log(img.getAttribute(src));
})();
