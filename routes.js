const routes = require('express').Router();
const file = require('./fileLoader');

routes.get('/', (req, res) => {
  res.render('index', 
            {
              locals: {data: Object.keys(file.data)},
              partials: {main: 'fileList'}
            }
  );
});

routes.get('/:filename', (req, res) => {
  res.render('index', 
            {
              locals: {data: file.data[req.params.filename], filename: req.params.filename},
              partials: {main: 'list'}
            }
  );
});

routes.get('/:filename/:id', (req, res) => {
  res.render('index', 
            {
              locals: file.data[req.params.filename][req.params.id],
              partials: {main: 'userEvents'}
            }
  );
});

module.exports = routes;