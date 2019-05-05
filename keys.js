console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
exports.twitterKeys = {
    consumer_key: 'x9esgYhTFk7oXePVEDdQ2Igjx',
    consumer_secret: 'PNUKFzG1Mf2FuLSpP4ZOjS7OGVGBm9kdvcgzSiM9PDreR1zhzy',
    access_token_key: '917984062148612097-2HnZkZaa1YPOaroaODchTtI6AXSPnIb',
    access_token_secret: 'o6J9AwdWkPuUxZsuJRHNmuQdwdQTa5zOpEXQLFQgTFHbW',
  };
  
  
  