var keys = require("./keys.js"); // Grab data from keys.js
var fs = require("fs"); // node package for reading and writing files
var request = require("request"); // node package for making http requests
var Twitter = require('twitter'); // node package that handles Twitter requests
var Spotify = require("node-spotify-api"); // node package that handles Spotify requests
//Prompts for command line syntax
var action = process.argv[2];
var value = process.argv[3];

//Spotify Exercise
function spotifyThisSong(value) {
	// Grab or assemble the song name and store it in a variable called "trackName"
	var trackName = 'The Sign Ace of Base';
	if (value != undefined) {
		trackName = value;
	}
	// Then run a request to the Spotify API with the track title specified
	var spotify = new Spotify({
	  id: keys.spotifyKeys.client_id,
	  secret: keys.spotifyKeys.client_secret
	});
	spotify.search({ type: 'track', query: trackName, limit: 5 }, function(err, data) {
		if (err) {
		    return console.log('Error occurred: ' + err);
		}
		// Show the following on the console and log file:
		// * Artist(s)
		// * The song's name
		// * A preview link of the song from Spotify
		// * The album that the song is from
		var firstResult = data.tracks.items[0];
		var trackInfo = "* Track Title: " + firstResult.name +
						"* Artist(s): " + firstResult.album.artists[0].name +
						"* Preview Link: " + firstResult.external_urls.spotify +
						"* Album Name: " + firstResult.album.name;		
		var dataArr = trackInfo.split("*");			
		for (i=0; i < dataArr.length; i++) {				
			console.log(dataArr[i].trim());
			// This block of code will create a file called "log.txt".
			// It will then print/append all the function responses into the file
			// 											  (err) => {
			fs.appendFile("log.txt", dataArr[i].trim()+"\n", function(err) {
				if (err) {
					return console.log(err);
				}
			});
		}
		console.log("\n===== log.txt was updated with Music info! =====");
	});
} //End Spotify Exercise

//Do What it Says Exercise
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
    	if(error) {
     		console.log(error);
     	}
     	else {
			var randomDataArray = data.split(',');
			var action = randomDataArray[0];
			var value = randomDataArray[1];
			switch (action) {
				case "my-tweets":
					myTweets();
					break;
				case "spotify-this-song":
					spotifyThisSong(value);
					break;
				case "movie-this":
					movieThis(value);
					break;
			}
		}
	});
} //End Do What it Says Exercise

//Twitter Exercise
function myTweets() {
	var client = new Twitter({
	     consumer_key: keys.twitterKeys.consumer_key,
	     consumer_secret: keys.twitterKeys.consumer_secret,
	     access_token_key: keys.twitterKeys.access_token_key,
	     access_token_secret: keys.twitterKeys.access_token_secret
	});
	var params = {count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
	    	for (var i = 0; i < tweets.length; i++) {
	        	console.log(tweets[i].text + "\nTweeted on: " + tweets[i].created_at);
	            fs.appendFile('log.txt', "\n" + tweets[i].text + "\n" + "Tweeted on: " + tweets[i].created_at + "\n", function(err) {
					if (err) {
						return console.log(err);
					}
	            });
	       }
	  	}
	  	else {
	    	console.log(error);
	  	}
		console.log("\n===== log.txt was updated with Twitter info! =====");
	});
} //End Twitter Exercise

// OMDB Movie Exercise
function movieThis(value) {
	// Grab or assemble the movie name and store it in a variable called "movieName"
	var movieName = 'Mr. Nobody';
	if (value != undefined) {
		movieName = value;
	}
	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=40e9cece";
	// Then create a request to the queryUrl
	request(queryUrl, function(error, response, body) {
	  // If the request is successful
		if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
			// Show the following on the console and log file:
			// * Title of the movie.
			// * Year the movie came out.
			// * IMDB Rating of the movie.
			// * Rotten Tomatoes Rating of the movie.
			// * Country where the movie was produced.
			// * Language of the movie.
			// * Plot of the movie.
			// * Actors in the movie.
			var movieInfo = "* Movie Title: " + movieData.Title +
							"* The movie's Release Year is: " + movieData.Year +
							"* The movie's IMDB Rating is: " + movieData.Ratings[0].Value +
							"* The movie's Rotten Tomatoes Rating is: " + movieData.Ratings[1].Value +
							"* The movie was produced in: " + movieData.Country +
							"* The movie's Language is: " + movieData.Language +
							"* The movie's Plot is: " + movieData.Plot +
							"* The movie's Actors include: " + movieData.Actors;			
			var dataArr = movieInfo.split("*");			
			for (i=0; i < dataArr.length; i++) {				
				console.log(dataArr[i].trim());
				// This block of code will create a file called "log.txt".
				// It will then print/append all the function responses into the file
				// 											  (err) => {
				fs.appendFile("log.txt", dataArr[i].trim()+"\n", function(err) {
					if (err) {
						return console.log(err);
					}
				});
			} 
		console.log("\n===== log.txt was updated with Movie info! =====");
	  	} 
	  	else {
	       console.log(error);
	  	}
	});
} //End OMDB Movie Exercise

switch (action) {
	case "my-tweets":
		myTweets();
		break;

	case "spotify-this-song":
		spotifyThisSong(value);
		break;

	case "movie-this":
		movieThis(value);
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;

	default:
		console.log("You must pass an action [my-tweets, spotify-this-song, movie-this, do-what-it-says] and a value");
		console.log("Example node liri.js movie-this Jumanji");
		break;
};