var dotenv = require('dotenv').config();
 
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// * `my-tweets`
var args = process.argv;
var choice = args[2];
if (choice === `my-tweets`){
    client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
        console.log(tweets);
     });
}
// * `spotify-this-song`
if (choice === `spotify-this-song`){
    if (args[3]){
        spotify.search({ type: 'track', query: args[3] }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            } 
          console.log(data); 
          });
        console.log(`Artist(s)`)  
        console.log(`song's name`)  
        console.log(`link`)  
        console.log(`Album`)  
    }else {
        console.log(`"The Sign" by Ace of Base.`)
    }
}
// * `movie-this`

// * `do-what-it-says`
