import axios from "axios";
import sgMail from "@sendgrid/mail";

//to fetch weather data

async function checkWeather() {
  //set up sendgrid
  const apiKey = process.env.SENDGRID_API_KEY_2;
  if (!apiKey) {
    throw new Error("API key is not defined");
  }
  sgMail.setApiKey(apiKey);

  //get the weather map data
  const weatherApiKey = "08825bff97baef22397e415d91a05ab6";
  const lat = "40.712776";
  const lon = "-74.005974";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
  const response = await axios.get(url);
  const weatherData = response.data;
  const city = weatherData.name;
  const weatherCondition = weatherData.weather[0].main;
  const weatherTemp = weatherData.main.temp;
  const logMessage = `${new Date().toDateString()} - ${city}: ${weatherCondition}, ${weatherTemp} `;

  const msg = {
    to: "dorothy.x.ren@gmail.com",
    from: "dren@wellesley.edu",
    subject: "sending weather update",
    text: `${logMessage}`,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
}

checkWeather();
