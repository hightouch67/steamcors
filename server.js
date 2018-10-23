const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.get('/', function(httpRequest, httpResponse) {
    httpResponse.send('Hello, World!');
});


var request = require('request');


app.get('/steam/game/:appid', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    var url = 'http://store.steampowered.com/api/appdetails?appids=' +
        httpRequest.params.appid;
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});

app.use('/', express.static('public'));

var bodyParser = require('body-parser');

app.use(bodyParser.text());


app.listen(port, () => console.log(`Listening on ${port}`));
console.log('Listening on port ' + port);
