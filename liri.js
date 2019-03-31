require("dotenv").config()
let moment = require('moment');
moment().format('MMMM Do YYYY');

let keys = require("./keys.js")
let Spotify = require("node-spotify-api")
let spotify = new Spotify(keys.spotify)
let fs = require("fs")
let commandText = process.argv[2]
let userInput = process.argv.slice(3).join(" ")
let request = require("request")




//spotify search
if (commandText === "spotify-this-song") {
  searchSong()
} //concert search
else if (commandText === "concert-this") {
  liveMusic()
  //movie search
} else if (commandText === "movie-this") {
  movieData()
} else(commandText === "do-what-it-says")


// spotify function
function searchSong() {


  spotify.search({
      type: 'track',
      query: userInput,
      limit: 1
    },

    function (error, response) {
      if (error) {
        return console.log(error);
      }
      //console log and random.txt append
      for (var j = 0; j < response.tracks.items[0].album.artists.length; j++) {
        console.log("––––– Your Song Info –––––")
        fs.appendFileSync("random.txt", "––––– Your Song Info –––––\n")

        console.log("Artist(s): " + response.tracks.items[0].album.artists[j].name);
        fs.appendFileSync("random.txt", "ARTIST(S): " + response.tracks.items[0].album.artists[j].name + "\n");

        console.log("Song: " + response.tracks.items[0].name);
        fs.appendFileSync("random.txt", "SONG NAME: " + response.tracks.items[0].name + "\n");

        console.log("Song Link: " + response.tracks.items[0].external_urls.spotify);
        fs.appendFileSync("random.txt", "SONG LINK: " + response.tracks.items[0].external_urls.spotify + "\n");

        console.log("Album: " + response.tracks.items[0].album.name);
        fs.appendFileSync("random.txt", "ALBUM: " + response.tracks.items[0].album.name + "\n");

      }
    }
  );
};




// concert function
function liveMusic() {


  if (userInput === undefined) {
    userInput = "The Killers"
  }
  let queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let showConcert = JSON.parse(body);
      for (var c = 0; c < 5; c++) {
        console.log("–––––CURRENT EVENTS FEATURING: ––––– \n " + "*****" + userInput + "*****"

        );
        fs.appendFileSync("random.txt", ("–––––CURRENT EVENTS FEATURING: ––––– \n " + "*****" + userInput + "***** \n"

        ));

        console.log("THE VENUE: " + showConcert[c].venue.name);
        fs.appendFileSync("random.txt", "THE VENUE: " + showConcert[c].venue.name + "\n");


        console.log("THE LOCATION: " + showConcert[c].venue.city);
        fs.appendFileSync("random.txt", "THE LOCATION: " + showConcert[c].venue.city + "\n");


        let date = showConcert[c].datetime;
        date = moment(date).format('MMMM DD YYYY');
        console.log("THE DATE: " + date + "\n");

        fs.appendFileSync("random.txt", "THE DATE: " + date + "\n")


      }
    }
  });

};

function movieData() {
  if (userInput === undefined) {
    userInput = "Mr.Nobody"
  }

  let queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {
      let showMovie = JSON.parse(body);

      if (!error && response.statusCode === 200) {
        for (var m = 0; m < 1; m++) {
          console.log("–––––YOUR MOVIE: ––––– \n " + "*****" + userInput + "*****\n");
          fs.appendFileSync("random.txt", "–––––YOUR MOVIE: ––––– \n " + "*****" + userInput + "***** \n")

          console.log("MOVIE TITLE: " + showMovie.Title + "\n");
          fs.appendFileSync("random.txt", "MOVIE TITLE" + showMovie.Title + "\n")

          console.log("RELEASE DATE: " + showMovie.Year + "\n")
          fs.appendFileSync("random.txt", "RELEASE DATE: " + showMovie.Year + "\n")

          console.log("IMDB RATING: " + showMovie.imdbRating + "\n")
          fs.appendFileSync("random.txt", "IMDB RATING: " + showMovie.imdbRating + "\n")

          console.log("ROTTEN TOMATOES RATING: " + showMovie.tomatoRating + "\n")
          fs.appendFileSync("random.txt", "ROTTEN TOMATOES RATING: " + showMovie.tomatoRating + "\n")

          console.log("COUNTRY OF PRODUCTION: " + showMovie.Country + "\n")
          fs.appendFileSync("random.txt", "COUNTRY OF PRODUCTION: " + showMovie.Country + "\n")

          console.log("LANGUAGE: " + showMovie.Language + "\n")
          fs.appendFileSync("random.txt", "LANGUAGE: " + showMovie.Language + "\n")

          console.log("MOVIE PLOT: " + showMovie.Plot + "\n")
          fs.appendFileSync("random.txt", "PLOT: " + showMovie.Plot + "\n")

          console.log("STARS: " + showMovie.Actors + "\n")
          fs.appendFileSync("random.txt", "STARS: " + showMovie.Actors + "\n")

        }

      }
    }

  )
}