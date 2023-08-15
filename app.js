const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define your routes as usual
app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});