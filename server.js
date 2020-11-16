const express = require('express');

const PORT = process.env.PORT || 7001;

const app = express();

// Middleware

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const routes = require('./controllers/burgers_controller');

app.use(routes);

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});