/* Global Variables */
const apiKey = 'c75289e2b20c04382c5d80d8d0ee06c3&units=imperial';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const zipElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');
const generateButton = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', weatherData);
/* Function called by event listener */
function weatherData() {
	// Handling invalid or empty input fields
	if (zipElement.value.trim() === '' || feelingsElement.value.trim === '') {
		alert('zip code and feelings are required fields');
		return;
	}

	getWeatherData(weatherURL, zipElement.value, apiKey)
		.then((data) =>
			sendDataToServer({
				date: newDate,
				temp: data.main.temp,
				feelings: feelingsElement.value,
			})
		)
		.then(() => getProjectData())
		.catch((e) => console.log(e));
}

/* Function to GET Web API Data*/
async function getWeatherData(baseURL, zipCode, apiKey) {
	const fetchWeather = await fetch(`${baseURL}${zipCode}&appid=${apiKey}`);

	try {
		const res = await fetchWeather.json();
		return res;
	} catch (error) {
		console.log('error', error);
		throw error;
	}
}

/* Function to POST data */
async function sendDataToServer(data = {}) {
	const newData = await fetch('/sendData', {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try {
		const res = await newData.json();
		return res;
	} catch (error) {
		console.log('error', error);
		throw error;
	}
}

async function fromBetween() {
	console.log('From Between');
}

/* Function to GET Project Data */
async function getProjectData() {
	const req = await fetch('/all');

	try {
		const allData = await req.json();
		document.getElementById('date').innerHTML = `Today is ${allData.date}`;
		document.getElementById('temp').innerHTML = `Temperature is ${Math.round(
			allData.temp
		)} degrees`;
		document.getElementById(
			'content'
		).innerHTML = `Your are feeling ${allData.feelings}`;
	} catch (error) {
		console.log('error', error);
		throw error;
	}
}
