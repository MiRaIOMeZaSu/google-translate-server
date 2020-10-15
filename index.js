const translate = require("google-translate-cn-api");
const express = require("express");
const AV = require('leanengine');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID || '{{appid}}',
  appKey: process.env.LEANCLOUD_APP_KEY || '{{appkey}}',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '{{masterkey}}'
});

const app = express();
app.use(AV.express());

const port = process.env.LEANCLOUD_APP_PORT;
const domain = "com";

// express server
app.get("/", function (req, res) {
  const text = req.query.text;
  delete req.query.text;

  translate(text, { ...{ domain: domain }, ...req.query })
    .then((resp) => res.json(resp))
    .catch((resp) => res.status(400).json(resp));
});

app.listen(port, function () {
  console.log(
    "\n   ___ _____   ___\n" +
      "  / __|_   _| / __| ___ _ ___ _____ _ _\n" +
      " | (_ | | |   \\__ \\/ -_) '_\\ V / -_) '_|\n" +
      "  \\___| |_|   |___/\\___|_|  \\_/\\___|_|\n\n"
  );
  console.log(`App listening on port ${port}!`);
  console.log(
    `Default Google Translate domain: https://translate.google.${domain}/`
  );
});
