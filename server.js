const express = require('express');
const es6Renderer = require('express-es6-template-engine')
const app = express();
const routes = require('./routes');
const path = require('path');
const fileLoader = require('./fileLoader');

app.use(express.static('styles'));
app.locals.basedir = path.join(__dirname, '');
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.use('/', routes);

const startServer = () => {
  app.listen(3000, () => {});
}

fileLoader.loadFiles(startServer);