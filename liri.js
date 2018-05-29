var dotenv = require('dotenv').config();
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
let action = process.argv[2]

myTweets = () => {
    var params = {screen_name: 'MaddBuddha'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++){
                console.log(tweets[i].text)
            }
        }
    });
}
songInfo = () => {
    let songTitle = "";
    for (let i = 3; i < process.argv.length; i++){
        if(i>2 && i<process.argv.length){
            songTitle = songTitle + " " + process.argv[i];
        } else {
            songTitle += process.argv[i]
        }
    }
    spotify.search({type: 'track', query: songTitle, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log('Artist ' + data.tracks.items[0].album.artists[0].name)
        console.log('Song Name ' + songTitle)
        console.log('Link ' + data.tracks.items[0].album.external_urls.spotify)
        console.log('Album ' + data.tracks.items[0].album.name)
    });
}
switch (action){
    case "my-tweets":
    myTweets();
    break;

    case 'spotify-this-song':
    songInfo();
    break;

    case 'movie-this':
    withdraw();
    break;

    case 'do what it says':
    lotto();
    break;
}


// * `my-tweets`
// var args = process.argv;
// var choice = args[2];
// if (choice === `my-tweets`){
//     client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//         console.log(tweets);
//      });
// }
// // * `spotify-this-song`
// if (choice === `spotify-this-song`){
//     if (args[3]){
//         spotify.search({ type: 'track', query: args[3] }, function(err, data) {
//             if (err) {
//               return console.log('Error occurred: ' + err);
//             } 
//           console.log(data); 
//           });
//         console.log(`Artist(s)`)  
//         console.log(`song's name`)  
//         console.log(`link`)  
//         console.log(`Album`)  
//     }else {
//         console.log(`"The Sign" by Ace of Base.`)
//     }
// }
// * `movie-this`

// * `do-what-it-says`
