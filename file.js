const fs = require("fs");

const path = (fileName) => `./database/${fileName}.json`;

const DEFAULT_CONTENT = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

function saveData(fileName = "default", data) {
  let content = data;
  if (typeof data !== "string") {
    content = JSON.stringify(content, null, 4);

    fs.writeFile(path(fileName), content, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

function getData(fileName = "default") {
  return new Promise((resolve, reject) => {
    fs.readFile(path(fileName), "utf-8", (err, data) => {
      if (err || !data) {
        resolve({ [fileName]: DEFAULT_CONTENT });
        console.log("No file or file is empty!");
      } else {
        let content = JSON.parse(data.toString());
        resolve({ [fileName]: content });
      }
    });
  });
}

module.exports = {
  saveData,
  getData,
};
