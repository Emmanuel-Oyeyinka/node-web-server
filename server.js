const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

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
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to Anoa Investments',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
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

app.listen(8000, () => {
    console.log('Server running on port 8000');
});