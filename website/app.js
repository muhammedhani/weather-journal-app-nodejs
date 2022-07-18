/* Global Variables */
const apiKey = 'c75289e2b20c04382c5d80d8d0ee06c3';
const openWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', weatherData);
/* Function called by event listener */
function weatherData() {
	// Handling invalid or empty input fields
	if (zip.value.trim() === '' || feelings.value.trim() === '') {
		alert('zip code and feelings are required fields!');
		return;
	}
	/**
	 * First, getting weatherData from API.
	 * After waiting weatherData, send it to the server.
	 * After sending it to server, return it to front-end by updating the UI
	 * */
	getWeatherData(openWeatherURL, zip.value, apiKey)
		.then(
			(
				data // then, send weatherData to server
			) =>
				sendDataToServer({
					date: newDate,
					temp: data.main.temp,
					feelings: feelings.value,
				})
		)
		.then(() => getProjectData()) // then, send it to front-end
		.catch((e) => console.log('error', e));
}

/* Function to GET Web API Data from OpenWeatherMap */
const getWeatherData = async (baseURL, zipCode, apiKey) => {
	const fetchWeather = await fetch(
		`${baseURL}${zipCode}&appid=${apiKey}&units=imperial`
	);
	try {
		const res = await fetchWeather.json();
		return res;
	} catch (error) {
		console.log('error', error);
		throw error;
	}
};

/* Function to POST data */
const sendDataToServer = async (data = {}) => {
	// making a POST request to assign the "projectData" variable to the new weatherData
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
};

/* Function to GET Project Data */
const getProjectData = async () => {
	// Making a GET request to get the saved weatherData from the server (from projectData variable)
	const req = await fetch('/all');
	try {
		const allData = await req.json();
		document.querySelector('#date').textContent = `Today is ${allData.date}`;
		document.querySelector('#temp').textContent = `Temperature is ${Math.round(
			allData.temp
		)} degrees`;
		document.querySelector(
			'#content'
		).textContent = `Your are feeling ${allData.feelings}`;
	} catch (error) {
		console.log('error', error);
		throw error;
	}
};
