require('dotenv').config()

const express = require("express");
const app = express();
const PORT = 8080;
const API_KEY = process.env.API_KEY
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require('body-parser');



const apiURL = `https://www.omdbapi.com/?apikey=${API_KEY}`

//Helper functions
async function search(movieTitle) {
  try {
    const movie = await request(`${apiURL}&s=${movieTitle}`, (error, response, body) => {
      console.log('error :>> ', error);
      console.log('response :>> ', response.statusCode);
      // console.log('body :>> ', body);
      // console.log('JSON.parse(body ) :>> ', JSON.parse(body)); 
      return JSON.parse(body)
    })
    console.log('API Request Finished!')
  } catch (error) {
    console.log('API Request Failed ', error);
  }
}

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Set template engine
app.set("view engine", "ejs");

//Render Homepage
app.get('/', function (req, res) {
  res.render('homepage')
})

//Movie Search
app.post('/search', (req, res) => {
  const movieTitle = req.body.movieTitle
  search(movieTitle);
  res.redirect('results')
});

 //Render Results Page
 app.get('/results', (req, res) => {
  res.render('results')
 });

 //Render Nominations Page
//  app.get('/nominations', (req, res) => {
//   res.render('nominations')
//  });


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
