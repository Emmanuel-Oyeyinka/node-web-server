// jshint esversion: 6

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8000;

var app = express();


// hbs declarations
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
});

// app declarations
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.get('/', (req, res) => {
    var hrs = new Date().getHours();
    var mins = new Date().getMinutes();
    var day = new Date().toDateString();
    var z = hrs <= 11 ? 'AM' : 'PM';
    if (hrs > 12) {
        hrs = hrs - 12;
    }
    if (mins < 10) {
        mins = '0' + mins;
    }
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to Anoa Investments',
        hours: hrs,
        minutes: mins,
        day: day,
        zone: z
    });
});

app.get('/about', (req, res) => {
    var hrs = new Date().getUTCHours();
    var mins = new Date().getMinutes();
    var day = new Date().toDateString();
    var z = hrs <= 11 ? 'AM' : 'PM';
    if (hrs > 12) {
        hrs = hrs - 12;
    }
    if (mins < 10) {
        mins = '0' + mins;
    }
    res.render('about.hbs', {
        pageTitle: 'About',
        hours: hrs,
        minutes: mins,
        day: day,
        zone: z
    });
});

app.get('/about/developer', (req, res) => {
    res.send({
        developer: 'Emmmanuel Oyeyinka',
        languages: [
            'Python',
            'JavaScript'
        ]
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});