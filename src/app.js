const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Express config (defined paths)
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Kerri-Ann Bates"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Kerri-Ann Bates"
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Get help here.",
        name: "Kerri-Ann Bates"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found.",
        name: "Kerri-Ann Bates"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found.",
        name: "Kerri-Ann Bates"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
