const fs = require("fs");

const initPath = (fileName) => `./database/${fileName}.json`;

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
  let content = data || DEFAULT_CONTENT;
  if (typeof data !== "string") {
    content = JSON.stringify(content, null, 4);

    fs.writeFile(initPath(fileName), content, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

function getData(fileName = "default") {
  let path = initPath(fileName);
  return new Promise((resolve) => {
    if (fs.existsSync(path)) {
      fs.readFile(path, "utf-8", (err, data) => {
        if (err || !data) {
          resolve({ [fileName]: DEFAULT_CONTENT });
          console.log("No file or file is empty!");
        } else {
          let content = JSON.parse(data.toString());
          resolve({ [fileName]: content });
        }
      });
    } else {
      resolve({ [fileName]: DEFAULT_CONTENT });
    }
  });
}

module.exports = {
  saveData,
  getData,
};
