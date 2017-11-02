const fs = require('fs');
const express = require('express');
const es6Renderer = require('express-es6-template-engine')
const app = express();
const path = require('path');

let datas;

app.use(express.static('styles'));
app.locals.basedir = path.join(__dirname, '');
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('userEvents', {locals: JSON.parse(datas[0])});
});

fs.readFile('data/userEventsActivity.json', (err, data) => {
  if (err) {
    return console.error(err);
  }

  app.listen(3000, () => {
    datas = data.toString().split('\n');
  });
});