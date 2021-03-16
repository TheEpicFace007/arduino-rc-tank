const fs = require('fs');
const pathToEntry = './build/index.html';
const bundlesRegExp = /\/static\/\w+\/\w+.[a-z0-9]+.\w{1,4}/g;
const splitBy = '</title>';

const builtHTMLContent = fs.readFileSync(pathToEntry).toString();
const links = builtHTMLContent.match(bundlesRegExp);
const parts = builtHTMLContent.split(splitBy);

let fileWithPreloadUnFiltered = [
  parts[0],
  splitBy,
];

links.forEach(link => {
  let fileType = 'script';

  if (/\.css$/.test(link)) {
    fileType = 'style';
    console.log(`Applying preload tag to stylesheet ${link}`)
  }
  else {
    if (/\.chun$/.test(link)) {
      link += "k";
    }
    console.log(`Applying preload tag to ${link}`)
  }

  fileWithPreloadUnFiltered = [
    ...fileWithPreloadUnFiltered,
    `<link rel="preload" href="${link}" as="${fileType}">`,
  ];
});


fileWithPreloadUnFiltered = [
  ...fileWithPreloadUnFiltered,
  parts[1],
];

for 


fs.writeFileSync(pathToEntry, fileWithPreloadUnFiltered.join(''));