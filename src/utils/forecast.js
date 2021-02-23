const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d10ec99bd81f0fe408ad5b8ddbd5915e&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);

        } else if (body.error) {
            callback("Unable to find location.", undefined);

        } else {
            const currentData = body.current;

            callback(undefined, 'It is ' + currentData.weather_descriptions + '. Temperature is currently ' + currentData.temperature + ' degress. It feels like ' + currentData.feelslike + ' degrees. There is a ' + currentData.precip + '% chance of rain.');
        }

    });
}

module.exports = forecast;