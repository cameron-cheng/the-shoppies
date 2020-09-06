const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const request = require("request")

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get('/', function (req, res) {
  res.send('Hello World')
})
 


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
