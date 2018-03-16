const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const routes = require('./routes');
const path = require('path');
const fileLoader = require('./fileLoader');

app.use(express.static('styles'));
app.locals.basedir = path.join(__dirname, '');
app.engine('.hbs', expressHandlebars({defaultLayout: 'index', extname: '.hbs', layoutsDir: 'views'}));
app.set('view engine', '.hbs');

app.use('/', routes);

const startServer = () => {
    app.listen(3000, () => {});
}

fileLoader.populate(startServer);