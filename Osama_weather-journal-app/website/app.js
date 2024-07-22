// Personal API Key for OpenWeatherMap API
const apiKey = "your_api_key&units=imperial";

/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

// Function called by event listener
function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeatherData(baseURL, zip, apiKey).then(function (data) {
    postData("/add", {
      date: newDate,
      temp: data.main.temp,
      content: feelings,
    }).then(updateUI);
  });
}

// Function to GET Web API Data
const getWeatherData = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to POST data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to GET Project Data and update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `Feelings: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
