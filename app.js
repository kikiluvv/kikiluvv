const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define your routes as usual
app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;
