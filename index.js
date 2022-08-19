const express = require("express");
const { saveData, getData } = require("./file.js");
const app = express();

app.use(express.json({limit: '50mb'}));

const port = 3000;

var Events;
(function (Events) {
  Events["onChange"] = "change";
  Events["onConnect"] = "connect";
  Events["onCreate"] = "create";
  Events["onDisconnect"] = "disconnect";
})(Events || (Events = {}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/save-data", async function (req, res) {
  let data = req.body;
  const {
    event,
    // payload,
    payload: {
      documentName,
      // requestParameters,
      document,
    },
  } = data;
  if (event === Events["onCreate"]) {
    console.log("\n-------------onCreate: " + documentName + "------------\n");
    let content = await getData(documentName);
    res.send(content);
  } else if (event === Events["onChange"]) {
    console.log("\n-------------onChange: " + documentName + "------------\n");
    saveData(documentName, document[documentName]);
    res.end();
  } else if(event === Events["onConnect"]) {
    res.send({})
  } else if(event === Events["onDisConnent"]) {
    res.send({})
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
