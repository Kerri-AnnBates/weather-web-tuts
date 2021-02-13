const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2F5YmVlMWphbSIsImEiOiJja2d1NnltZXMwOGx3MnJvNjl3Y2g5dWE3In0.EWYEKHKQ7SfvG9eLifAuHg&limit=1`;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback("Unable to connect to location services", undefined);

        } else if (body.features.length === 0) {
            callback("Unable to find location.", undefined);

        } else {
            const location = body.features[0];
            callback(undefined, {
                latitude: location.center[1],
                longitude: location.center[0],
                location: location.place_name
            });
        }
    });
}

module.exports = geocode;