const routes = require('express').Router();
const file = require('./fileLoader');

routes.get('/', (req, res) => {
  res.render('fileList',
            {
              data: file.flat,
            }
  );
});

routes.get('/:filename', (req, res) => {
  res.render('list',
            {
              data: file.data[req.params.filename],
                filename: req.params.filename
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