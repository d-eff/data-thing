const fs = require('fs');
const express = require('express');
const es6Renderer = require('express-es6-template-engine')
const app = express();
const path = require('path');

let datas = {};

app.use(express.static('styles'));
app.locals.basedir = path.join(__dirname, '');
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index', 
            {
              locals: {data: Object.keys(datas)},
              partials: {main: 'fileList'}
            }
  );
});

app.get('/:filename', (req, res) => {
  res.render('index', 
            {
              locals: {data: datas[req.params.filename], filename: req.params.filename},
              partials: {main: 'list'}
            }
  );
});

app.get('/:filename/:id', (req, res) => {
  res.render('index', 
            {
              locals: datas[req.params.filename][req.params.id],
              partials: {main: 'userEvents'}
            }
  );
});

fs.readdir('data', (err, files) => {
  if (err) {
    return console.error(err);
  }
  files.forEach((filename) => {
    let fullPath = 'data/' + filename
    let shortname = filename.replace('.json', '');
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        console.error(err);
      }
      datas[shortname] = data.toString().trim().split('\n').map(val => {
        return JSON.parse(val);
      });
    });
  });

  app.listen(3000, () => {});
});