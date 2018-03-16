const routes = require('express').Router();
const file = require('./fileLoader');

routes.get('/', (req, res) => {
  res.render('fileList',
            {
              data: file.flat,
                helpers: {
                    sanitize: function(string) {
                        return string.replace('.json', '');
                    }
                }
            }
  );
});

routes.get('/:filename', (req, res) => {
  res.render('list',
            {
              data: file.data[req.params.filename],
                filename: req.params.filename,
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

routes.get('/schemas/:folder/:filename', async (req, res) => {
    await file.loadFile(req.params.folder, req.params.filename, (newFile) => {
        res.send(newFile);
        
    });
});

module.exports = routes;