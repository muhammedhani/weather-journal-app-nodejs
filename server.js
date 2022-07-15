// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const port = 8080;
const server = app.listen(port, listening);

function listening() {
	console.log('Server is Running Locally!');
	console.log(`Listening on Port: ${port}`);
}

// Initialize all route with a callback function
app.get('/getData', (req, res) => {
	res.send(projectData);
});

// Callback function to complete GET '/all'

// Post Route
app.post('/sendData', addData);
function addData(req, res) {
	projectData = req.body;
	console.log(req.body);
}
